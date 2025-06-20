import { useState } from 'react';
import Image from 'next/image';

interface Pergunta {
  id: number;
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
}

interface AvaliacaoModalProps {
  nomeCurso: string;
  slug: string;
  onClose: () => void;
}

const perguntasExemplo: Pergunta[] = [
  {
    id: 1,
    pergunta: 'Qual a função principal do porteiro?',
    alternativas: [
      'Controlar o acesso de pessoas e veículos',
      'Limpar o prédio',
      'Receber encomendas',
      'Cozinhar para os moradores',
    ],
    respostaCorreta: 0,
  },
  {
    id: 2,
    pergunta: 'O que o porteiro deve fazer em caso de emergência?',
    alternativas: [
      'Nada, aguardar ordens',
      'Acionar os responsáveis e autoridades',
      'Fechar a porta e fugir',
      'Avisar os moradores por rede social',
    ],
    respostaCorreta: 1,
  },
];

export default function AvaliacaoModal({ nomeCurso, slug, onClose }: AvaliacaoModalProps) {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviou, setEnviou] = useState(false);
  const [acertos, setAcertos] = useState(0);

  function handleSelecionarResposta(perguntaId: number, alternativaIdx: number) {
    if (enviou) return;
    setRespostas((prev) => ({ ...prev, [perguntaId]: alternativaIdx }));
  }

  function handleEnviar() {
    let count = 0;
    perguntasExemplo.forEach((p) => {
      if (respostas[p.id] === p.respostaCorreta) count++;
    });
    setAcertos(count);
    setEnviou(true);
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

      <div className="w-full h-64 relative mb-6">
        <Image
          src={slug === 'agente-de-portaria' ? '/images/course/course-1.png' : '/images/course/course-1.png'}
          alt={nomeCurso}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex flex-col gap-6">
        {perguntasExemplo.map((p) => (
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
            disabled={Object.keys(respostas).length !== perguntasExemplo.length}
            className="self-start px-6 py-3 bg-[#065473] text-white rounded text-lg font-semibold disabled:opacity-50 hover:bg-[#034b58] transition"
          >
            Enviar Respostas
          </button>
        ) : (
          <div className="p-4 bg-green-100 rounded text-green-900 font-semibold text-xl">
            Você acertou {acertos} de {perguntasExemplo.length} perguntas!
          </div>
        )}
      </div>
    </div>
  );
}
