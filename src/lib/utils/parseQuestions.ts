export type Question = {
  question: string;
  options: string[];
  correct: string;
};

export function parseQuestions(markdown: string): Question[] {
  const blocks = markdown.split(/### Pergunta \d+/).slice(1);

  return blocks.map((block) => {
    const lines = block.trim().split("\n");
    const question = lines[0]?.replace(/\*\*/g, "").trim();

    const options = lines
      .filter((line) => /^[a-d]\)/.test(line))
      .map((line) => line.trim());

    const correctLine = lines.find((line) =>
      /\*\*Resposta correta:\*\*/i.test(line)
    );

    const correctMatch = correctLine?.match(/\*\*Resposta correta:\*\*\s*([a-d]\).+)/i);

    const correct = correctMatch ? correctMatch[1].trim() : "";

    return { question, options, correct };
  });
}
