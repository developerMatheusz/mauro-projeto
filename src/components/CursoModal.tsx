import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AvaliacaoModal, { Pergunta } from './AvaliacaoModal';

type CursoModalProps = {
  nomeCurso: string;
  horas: string;
  slug: string;
  curso: {
    pdf: string;
    coverImage: string;
    description: string;
    quiz: Pergunta[];
  }
};

const CursoModal = ({ nomeCurso, horas, slug, curso }: CursoModalProps) => {
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
    window.open(curso.pdf, '_blank');
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

      <div className="text-2xl font-medium text-[#F2A950] mb-4">
        Carga Horária de {horas} horas
      </div>

      <div className="w-full mt-8 grid md:grid-cols-[1fr_3fr] grid-cols-1 gap-6 mb-4">
        <div className="w-full h-60 relative">
          <Image
            src={curso.coverImage}
            alt={`Banner do curso ${nomeCurso}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-lg">{curso.description}</p>
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
          quiz={curso.quiz}
        />
      )}
    </div>
  );
};

export default CursoModal;
