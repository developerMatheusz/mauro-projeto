"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { courses } from "../mockData";

const faqData = [
  {
    pergunta: "Como posso obter o certificado?",
    resposta:
      "Após concluir o curso e a avaliação, você poderá adquirir o certificado mediante pagamento. Clique no link acima para mais informações.",
  },
  {
    pergunta: "Quanto custa o certificado?",
    resposta:
      "O valor do certificado pode variar conforme o curso. Consulte a página de certificação para detalhes atualizados.",
  },
  {
    pergunta: "Posso usar o certificado para comprovar experiência profissional?",
    resposta:
      "Sim, o certificado é válido para comprovação de capacitação em processos seletivos e em seu currículo profissional.",
  },
  {
    pergunta: "Modelo do Certificado",
    resposta: "modelo",
  },
];

const Certificado = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(faqData.map((_, i) => i));

  const toggleIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <main className="pb-14 mt-6 w-full md:max-w-[70%] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-center">Área de cursos</h2>
        {Object.entries(courses).map(([categoria, listaCursos]) => (
          <section key={categoria} className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-left">{categoria}</h3>

            <div className="w-full border border-black/50 flex flex-col gap-2 rounded-md">
              {listaCursos.map(({ slug, title }) => (
                <Link
                  key={slug}
                  href={`/matricula/${slug}`}
                  className="text-lg text-blue-500 hover:underline p-2 border-b border-black/50 last:border-b-0"
                >
                  {title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-bold">Certificado</h3>
        {faqData.map((item, i) => {
          const isOpen = openIndexes.includes(i);
          return (
            <div key={i} className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleIndex(i)}
                className="w-full text-left px-4 py-3 bg-[#065473] font-semibold flex justify-between items-center hover:bg-opacity-80 transition text-white"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-header-${i}`}
              >
                {item.pergunta}
                <span
                  className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"} text-white`}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  className="px-4 py-3 bg-gray-50 text-gray-700"
                >
                  {item.resposta === "modelo" ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <p className="font-semibold mb-2">Frente do certificado:</p>
                        <div className="relative w-full lg:h-96 h-72">
                            <Image
                                src="/frente.png"
                                alt="Certificado Frente"
                                fill
                                className="rounded shadow w-full h-full"
                            />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-2">Verso do certificado:</p>
                        <div className="relative w-full lg:h-96 h-72">
                            <Image
                                src="/verso.png"
                                alt="Certificado Verso"
                                fill
                                className="rounded shadow w-full h-full"
                            />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>{item.resposta}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Certificado;
