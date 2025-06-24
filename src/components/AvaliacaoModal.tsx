import { useEffect, useState } from 'react';
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
    pergunta: 'Qual é a principal função do agente de portaria?',
    alternativas: [
      'Realizar rondas armadas nos corredores',
      'Executar tarefas administrativas complexas',
      'Controlar o acesso de pessoas e veículos',
      'Atuar como vigilante particular',
    ],
    respostaCorreta: 2,
  },
  {
    id: 2,
    pergunta: 'Em quais locais o agente de portaria pode atuar?',
    alternativas: [
      'Apenas em condomínios residenciais',
      'Somente em hospitais',
      'Em locais públicos, como praças e ruas',
      'Em condomínios, hospitais, escolas e empresas',
    ],
    respostaCorreta: 3,
  },
  {
    id: 3,
    pergunta: 'O que é essencial para o perfil profissional do agente de portaria?',
    alternativas: [
      'Ser rigoroso e inflexível com todos',
      'Ter força física e habilidade em artes marciais',
      'Apresentar postura ética, atenção e cordialidade',
      'Estar disposto a fazer qualquer tarefa fora da função',
    ],
    respostaCorreta: 2,
  },
  {
    id: 4,
    pergunta: 'A postura ética do agente de portaria inclui:',
    alternativas: [
      'Informar detalhes da rotina interna aos visitantes',
      'Fazer comentários sobre moradores para colegas',
      'Manter sigilo, respeito e agir com imparcialidade',
      'Priorizar amigos e conhecidos no atendimento',
    ],
    respostaCorreta: 2,
  },
  {
    id: 5,
    pergunta: 'Qual atitude demonstra profissionalismo na portaria?',
    alternativas: [
      'Permitir acesso sem identificação para não atrasar',
      'Discutir com visitantes em caso de conflito',
      'Estar sempre uniformizado e identificado',
      'Ignorar regras internas quando estiver de bom humor',
    ],
    respostaCorreta: 2,
  },
  {
    id: 6,
    pergunta: 'Um agente de portaria contribui para a imagem da empresa quando:',
    alternativas: [
      'Discute com visitantes que não seguem regras',
      'Faz piadas com moradores e funcionários',
      'Recebe as pessoas com educação e eficiência',
      'Dá ordens como se fosse segurança do local',
    ],
    respostaCorreta: 2,
  },
  {
    id: 7,
    pergunta: 'Em uma situação suspeita, o agente de portaria deve:',
    alternativas: [
      'Afastar o visitante imediatamente com violência',
      'Ignorar o fato para evitar problemas',
      'Ligar para amigos e pedir ajuda externa',
      'Manter a calma e acionar os responsáveis conforme o protocolo',
    ],
    respostaCorreta: 3,
  },
  {
    id: 8,
    pergunta: 'O que o agente de portaria deve fazer ao começar em um novo local de trabalho?',
    alternativas: [
      'Esperar ordens antes de aprender qualquer coisa',
      'Criar suas próprias regras de conduta',
      'Estudar o regulamento interno do local',
      'Anotar o nome de todos os moradores rapidamente',
    ],
    respostaCorreta: 2,
  },
  {
    id: 9,
    pergunta: 'O que diferencia o agente de portaria de um segurança?',
    alternativas: [
      'A cor do uniforme',
      'O porte de arma',
      'A função específica no controle de acesso',
      'A jornada de trabalho noturna',
    ],
    respostaCorreta: 2,
  },
  {
    id: 10,
    pergunta: 'Qual destas atitudes compromete a ética profissional do agente?',
    alternativas: [
      'Atender a todos com imparcialidade',
      'Compartilhar informações sigilosas com terceiros',
      'Cumprir as regras do local',
      'Agir com discrição em situações delicadas',
    ],
    respostaCorreta: 1,
  },
];

const perguntasAtendente: Pergunta[] = [
  {
    id: 1,
    pergunta: 'Qual técnica é usada para entender as necessidades do cliente em vendas consultivas?',
    alternativas: [
      'SPIN',
      'SWOT',
      'PDCA',
      '5W2H',
    ],
    respostaCorreta: 0,
  },
  {
    id: 2,
    pergunta: 'O que representa o indicador FCR?',
    alternativas: [
      'First Contact Resolution',
      'Fast Customer Reaction',
      'Final Customer Result',
      'Feedback Customer Rating',
    ],
    respostaCorreta: 0,
  },
  {
    id: 3,
    pergunta: 'Na LGPD, qual princípio exige que apenas dados estritamente necessários sejam coletados?',
    alternativas: [
      'Finalidade',
      'Minimização',
      'Transparência',
      'Qualidade dos dados',
    ],
    respostaCorreta: 1,
  },
  {
    id: 4,
    pergunta: 'Em um CRM, qual funcionalidade é responsável por agendar e automatizar follow-ups?',
    alternativas: [
      'Pipeline',
      'Automação de e-mail',
      'Relatórios',
      'Dashboards',
    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    pergunta: 'O que significa NPS?',
    alternativas: [
      'Net Promoter Score',
      'New Purchase Strategy',
      'Network Performance Survey',
      'Next Product Sale',
    ],
    respostaCorreta: 0,
  },
  {
    id: 6,
    pergunta: 'Qual técnica de negociação parte da melhor alternativa em caso de não acordo?',
    alternativas: [
      'BATNA',
      'SWOT',
      'PNL',
      'SPIN',
    ],
    respostaCorreta: 0,
  },
  {
    id: 7,
    pergunta: 'No fluxo de atendimento, o que indica o SLA?',
    alternativas: [
      'Tempo máximo para resolução',
      'Segmento de leads activos',
      'Sistema de logística aplicada',
      'Software de licença anual',
    ],
    respostaCorreta: 0,
  },
  {
    id: 8,
    pergunta: 'A escuta ativa inclui:',
    alternativas: [
      'Interromper o cliente para corrigir',
      'Reformular e confirmar entendimento',
      'Evitar perguntas abertas',
      'Focar apenas em vender',
    ],
    respostaCorreta: 1,
  },
  {
    id: 9,
    pergunta: 'Um programa de fidelização eficaz baseia-se em:',
    alternativas: [
      'Ações únicas sem personalização',
      'Comunicação segmentada e benefícios',
      'Apenas descontos gerais',
      'Reclamações não atendidas',
    ],
    respostaCorreta: 1,
  },
  {
    id: 10,
    pergunta: 'Indicador que mede satisfação no primeiro contato:',
    alternativas: [
      'AHT',
      'CSAT',
      'FCR',
      'LTV',
    ],
    respostaCorreta: 2,
  },
];

export default function AvaliacaoModal({ nomeCurso, slug, onClose }: AvaliacaoModalProps) {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviou, setEnviou] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const perguntas = nomeCurso === 'Atendente Comercial' ? perguntasAtendente : perguntasExemplo;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
      </div>
    </div>
  );
}
