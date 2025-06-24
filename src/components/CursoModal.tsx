import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AvaliacaoModal from './AvaliacaoModal';

const CursoModal = ({ nomeCurso, horas, slug }: { nomeCurso: string; horas: string; slug: string; }) => {
  const router = useRouter();
  const [leuPDF, setLeuPDF] = useState(false);
  const [showAvaliacao, setShowAvaliacao] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAbrirPDF = () => {
    window.open(slug === "atendente-comercial" ? "/visualizar-pdf/atendente-comercial.pdf" : "/visualizar-pdf/agente-de-portaria.pdf", '_blank');
    setLeuPDF(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-bold">{nomeCurso}</h2>
        <button
          onClick={() => router.push('/')}
          className="text-lg bg-[#065473] rounded-md text-white px-4 py-2 font-semibold"
        >
          Sair
        </button>
      </div>

      <div className="text-2xl font-medium text-[#F2A950] mb-4">Carga Horária de {horas} horas</div>

      <div className="w-full mt-8 grid md:grid-cols-[1fr_3fr] grid-cols-1 gap-6 mb-4">
        <div className="w-full h-60 relative">
            <Image
                src={
                    slug === 'agente-de-portaria'
                    ? '/images/course/course-1.png'
                    : '/images/course/course-2.png'
                }
                alt="Banner"
                fill
                className="object-cover"
            />
        </div>
        <div className="flex flex-col gap-2 w-full">
            <p className="text-lg">
                {slug === 'agente-de-portaria' ? "Objetivo geral de capacitar o aluno para atuar com eficiência e segurança como agente de portaria em diferentes tipos de instituições, compreendendo suas atribuições, postura profissional, atendimento ao público e procedimentos operacionais." : "Capacitar o aluno para atuar com excelência na função de atendente comercial em diversos segmentos do mercado, desenvolvendo habilidades de comunicação, atendimento ao cliente, postura profissional, organização de rotinas administrativas e técnicas de vendas, visando um atendimento eficiente, cordial e voltado à satisfação do cliente."}
            </p>
        </div>
      </div>

      <div className="w-full border rounded-lg p-4 bg-gray-50">
        <p className="text-lg mb-2">Leia o conteúdo programático em PDF para liberar a avaliação:</p>
        <button
          onClick={handleAbrirPDF}
          className="px-4 py-2 bg-[#F2A950] text-white rounded hover:bg-[#e4983e] transition"
        >
          Ler PDF
        </button>
      </div>

      {leuPDF && (
        <div className="mt-6">
          <button
            onClick={() => setShowAvaliacao(true)}
            className="px-6 py-3 bg-[#065473] text-white rounded text-lg font-semibold hover:bg-opacity-70 transition"
          >
            Fazer Avaliação
          </button>
        </div>
      )}
      {showAvaliacao && (
        <AvaliacaoModal
          nomeCurso={nomeCurso}
          slug={slug}
          onClose={() => setShowAvaliacao(false)}
        />
      )}
    </div>
  );
};

export default CursoModal;
