import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';

export interface Pergunta {
  id: number;
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
}

interface PaymentResponse {
  point_of_interaction: {
    transaction_data: {
      qr_code: string;
      qr_code_base64: string;
    };
  };
  id: string;
}

interface AvaliacaoModalProps {
  nomeCurso: string;
  slug: string;
  quiz: Pergunta[];
  onClose: () => void;
  cpf: string;
  name: string;
  horas: string;
}

export default function AvaliacaoModal({ nomeCurso, onClose, quiz, cpf, name, horas }: AvaliacaoModalProps) {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviou, setEnviou] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [preference, setPreference] = useState<PaymentResponse | null>(null);
  const [statusPagamento, setStatusPagamento] = useState<'pending' | 'approved' | null>(null);
  const [copiado, setCopiado] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mostrarCertificado, setMostrarCertificado] = useState(false);
  const perguntas = quiz;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const desenharCertificado = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.src = '/frente.png';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = '#000000';
      ctx.font = '70px serif';
      ctx.textAlign = 'left';

      ctx.fillText(cpf, 1340, 790);
      ctx.fillText(nomeCurso, 670, 890);
      ctx.fillText(horas, 1210, 990);

      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();

      ctx.font = '40px serif'
      ctx.fillText(dia, 1850, 990);
      ctx.fillText(mes, 1920, 990);
      ctx.fillText(ano.toString(), 2000, 990);
      ctx.font = '70px serif'
      ctx.fillText(name.toString(), 1110, 1150);

      const rawString = `${name}-${dia}${mes}${ano}-${cpf}`;
      const uuidBase64 = btoa(unescape(encodeURIComponent(rawString)));

      ctx.font = '40px serif';
      ctx.fillText(`UUID: ${uuidBase64}`, 490, 600);
    };
  }, [name, cpf, nomeCurso, horas]);

  useEffect(() => {
    if (mostrarCertificado) {
      desenharCertificado();
    }
  }, [mostrarCertificado, desenharCertificado]);

  useEffect(() => {
    if (statusPagamento == 'approved') {
      setMostrarCertificado(true);
      desenharCertificado();
    }
  }, [statusPagamento, desenharCertificado]);

  function baixarPDF() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`certificado_${name.toLowerCase()}.pdf`);
  }

  async function handleVerificarPagamento() {
    if (!preference) return;

    const paymentId = preference.id;

    const res = await fetch('/api/mercadopago/consultar-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId })
    });

    const data = await res.json();

    if (data.status === 'approved') {
      setStatusPagamento('approved');
    } else {
      setStatusPagamento('pending');
    }
  }

  async function handlePagarCertificado() {
    if (!cpf) return;

    const res = await fetch('/api/mercadopago/pagar-certificado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf })
    });

    const data = await res.json();

    if (data.payment) {
      setPreference(data.payment);
    } else {
      alert('Erro ao gerar pagamento Pix.');
    }
  }

  function handleSelecionarResposta(perguntaId: number, alternativaIdx: number) {
    if (enviou) return;
    setRespostas((prev) => ({ ...prev, [perguntaId]: alternativaIdx }));
  }

  function handleEnviar() {
    let count = 0;
    perguntas.forEach((p) => {
      if (respostas[p.id] === p.respostaCorreta) count++;
    });
    setAcertos(count);
    setEnviou(true);
  }

  function handleRefazer() {
    setRespostas({});
    setEnviou(false);
    setAcertos(0);
    setPreference(null);
    setStatusPagamento(null);
    setMostrarCertificado(false);
    setCopiado(false);
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col p-4 overflow-y-auto">
      <div className="flex justify-between gap-4 items-center mb-6">
        <h2 className="text-3xl font-bold">{nomeCurso}</h2>
        <button
          onClick={onClose}
          className="text-lg bg-[#065473] rounded-md text-white px-4 py-2 font-semibold"
        >
          Fechar
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {mostrarCertificado ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-3xl font-bold mb-6">Seu Certificado Digital</h2>
            <canvas ref={canvasRef} className="border rounded max-w-full max-h-[80vh]" />
            <button
              onClick={baixarPDF}
              className="mt-6 px-6 py-3 bg-[#065473] text-white rounded hover:bg-[#034b58] transition"
            >
              Baixar Certificado em PDF
            </button>
          </div>
        ) : !preference ? (
          <>
            {perguntas.map((p) => (
              <div key={p.id} className="border rounded p-4 bg-gray-50">
                <p className="font-semibold mb-2">{p.pergunta}</p>
                <div className="flex flex-col gap-2">
                  {p.alternativas.map((alt, i) => {
                    const selecionada = respostas[p.id] === i;
                    return (
                      <label
                        key={i}
                        className={`rounded p-2 border ${
                          selecionada ? 'border-[#F2A950] bg-[#FFF8E1]' : 'border-transparent'
                        } ${enviou ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-[#FFF8E1]'} `}
                      >
                        <input
                          type="radio"
                          name={`pergunta-${p.id}`}
                          checked={selecionada}
                          onChange={() => handleSelecionarResposta(p.id, i)}
                          className="mr-2"
                          disabled={enviou}
                        />
                        {alt}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            {!enviou ? (
              <button
                onClick={handleEnviar}
                disabled={Object.keys(respostas).length !== perguntas.length}
                className="self-start px-6 py-3 bg-[#065473] text-white rounded text-lg font-semibold disabled:opacity-50 hover:bg-[#034b58] transition"
              >
                Enviar Respostas
              </button>
            ) : (
              <div className="p-4 bg-green-100 rounded text-green-900 font-semibold text-xl">
                Você acertou {acertos} de {perguntas.length} perguntas!
              </div>
            )}

            {acertos >= 7 ? (
              <button
                onClick={handlePagarCertificado}
                className="mt-4 px-6 py-3 bg-[#F2A950] text-white rounded text-lg font-semibold hover:bg-[#e39a34] transition"
              >
                Pagar Certificado
              </button>
            ) : (
              enviou && (
                <button
                  onClick={handleRefazer}
                  className="mt-4 px-6 py-3 bg-[#F2A950] text-white rounded text-lg font-semibold hover:bg-[#e39a34] transition"
                >
                  Refazer
                </button>
              )
            )}
          </>
        ) : (
          <div className="mt-6 p-4 border rounded bg-gray-100">
            <h3 className="text-xl font-semibold mb-2">Pague com Pix</h3>
            <p className="mb-2">Escaneie o QR Code ou copie o código Pix abaixo:</p>
            <Image
              src={`data:image/png;base64,${preference.point_of_interaction.transaction_data.qr_code_base64}`}
              alt="QR Code Pix"
              width={300}
              height={300}
            />
            <textarea
              readOnly
              value={preference.point_of_interaction.transaction_data.qr_code}
              className="w-full p-2 mt-4 bg-transparent text-sm resize-none outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(preference.point_of_interaction.transaction_data.qr_code);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 5000);
              }}
              className="px-4 py-2 mt-4 bg-[#065473] text-white rounded hover:bg-[#034b58] transition"
            >
              {copiado ? 'Código copiado!' : 'Copiar código Pix'}
            </button>
            <button
              onClick={handleVerificarPagamento}
              className="px-4 py-2 ml-4 bg-[#F2A950] text-white rounded hover:bg-[#e39a34] transition"
            >
              Já paguei
            </button>

            {statusPagamento === 'pending' && (
              <div className="p-4 mt-4 bg-yellow-100 rounded text-yellow-900 font-semibold">
                Pagamento ainda não foi confirmado. Tente novamente em alguns segundos.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
