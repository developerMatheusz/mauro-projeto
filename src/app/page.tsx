import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";
import { courses } from "./mockData";

const Home = () => {
  const todosCursos = Object.values(courses).flat();

  return (
    <main className="pb-14">
      <Banner />
      <div className="mt-6 w-full md:max-w-[70%] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
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
        <div className="w-full flex flex-col">
          <h3 className="text-3xl font-bold">Cursos Online Gratuitos com Certificado</h3>
          <p className="text-lg">A Academia do Conhecimento disponibiliza GRATUITAMENTE o cadastro, a matrícula, o material didático e a avaliação! Somente o Certificado é pago. Para saber como adquirir a certificação, <Link href="/certificado" className="text-blue-500 hover:underline">clique aqui.</Link></p>
          <p className="text-lg mt-3">Nossos cursos livres são de Atualização e Capacitação. Estude conosco! Nossos Certificados são muito usados em A.A.C.C. (Atividades Acadêmicas Curriculares Complementares em faculdades), Prova de Títulos (consulte seu edital), capacitação profissional e enriquecimento de currículo.</p>
          <p className="text-3xl font-bold mt-3">Cursos online gratuitos para você:</p>
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-6">
            {todosCursos.map(({ slug, title, subtitle, coverImage }) => (
              <Link
                key={slug}
                href={`/matricula/${slug}`}
                className="w-full flex flex-col items-center justify-between gap-4 border border-black/50 rounded-md p-2"
              >
                <div className="w-full h-60 relative">
                  <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={true}
                  />
                  <div className="absolute bottom-0 left-0 bg-white p-1 text-sm">
                    De 20 a 40 horas
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full text-center text-[#065473] font-semibold text-lg">
                    {title}
                  </div>
                  <div className="w-full text-center text-lg">{subtitle}</div>
                </div>
                <button className="w-full bg-[#065473] text-center text-white p-2 hover:bg-opacity-70">
                  Matricule-se grátis
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
