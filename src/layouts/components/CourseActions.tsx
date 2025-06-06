"use client";

import { Question } from "@/lib/utils/parseQuestions";
import Image from "next/image";
import { useState } from "react";

interface CourseActionsProps {
  courseContent1: string;
  courseContent2: Question[];
}

const CourseActions = ({ courseContent1, courseContent2 }: CourseActionsProps) => {
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleAnswer = (questionIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const finishExam = () => {
    let correctCount = 0;

    courseContent2.forEach((q, index) => {
      const selected = answers[index];
      const correctAnswerText = q.correct;

      if (selected === correctAnswerText) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / courseContent2.length) * 10;
    setScore(parseFloat(finalScore.toFixed(1)));
  };

  const resetExam = () => {
    setIsExamOpen(false);
    setAnswers({});
    setScore(null);
    setShowCertificate(false);
  };

  const emitCertificate = () => {
    setShowCertificate(true);
  };

  return (
    <>
      <div className="row justify-center">
        <article className="lg:col-10 flex items-center gap-4">
          <button
            className="btn border border-[#035373] hover:bg-[#035373] hover:text-white text-[#035373] btn-sm cursor-pointer text-lg"
            onClick={() => setIsCourseOpen(true)}
          >
            Abrir curso
          </button>
          <button
            className="btn border border-[#035373] hover:bg-[#035373] hover:text-white text-[#035373] btn-sm cursor-pointer text-lg"
            onClick={() => setIsExamOpen(true)}
          >
            Iniciar prova
          </button>
        </article>
      </div>

      {isCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4">Conteúdo do curso</h2>
            <div
              className="content mb-10"
              dangerouslySetInnerHTML={{ __html: courseContent1 }}
            />
            <button
              onClick={() => setIsCourseOpen(false)}
              className="btn border border-[#035373] hover:bg-[#035373] hover:text-white text-[#035373] btn-sm cursor-pointer text-lg mt-5"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isExamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4">Prova final</h2>

            {showCertificate ? (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/images/certificate.png"
                  alt="Certificado"
                  width={600}
                  height={600}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>
            ) : (
              <>
                {courseContent2.map((q, index) => (
                  <div key={index} className="mb-8">
                    <p className="font-semibold mb-2">{`Questão ${index + 1}: ${q.question}`}</p>
                    <div className="space-y-2 pl-4">
                      {q.options.map((opt, i) => (
                        <label key={i} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={opt}
                            checked={answers[index] === opt}
                            onChange={() => handleAnswer(index, opt)}
                            className="form-radio text-[#035373]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {score === null ? (
                  <button
                    onClick={finishExam}
                    disabled={Object.keys(answers).length !== courseContent2.length}
                    className={`btn bg-[#035373] text-white btn-sm text-lg mt-4 cursor-pointer hover:opacity-90 ${
                      Object.keys(answers).length !== courseContent2.length
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Finalizar prova
                  </button>
                ) : (
                  <div className="mt-6 text-xl font-bold flex items-center gap-4">
                    Sua nota: <span className="text-[#035373]">{score}/10</span>

                    {score >= 6 && (
                      <button
                        onClick={emitCertificate}
                        className="btn bg-[#035373] text-white btn-sm text-lg cursor-pointer hover:opacity-90"
                      >
                        Emitir certificado
                      </button>
                    )}
                    {score <= 6 && (
                        <button
                            onClick={resetExam}
                            className="underline text-sm text-[#035373] cursor-pointer hover:text-black"
                        >
                            Refazer
                        </button>
                    )}
                  </div>
                )}
              </>
            )}

            <button
              onClick={resetExam}
              className="block mt-6 btn border border-[#035373] hover:bg-[#035373] hover:text-white text-[#035373] btn-sm text-lg cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseActions;
