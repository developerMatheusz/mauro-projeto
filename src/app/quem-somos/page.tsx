import Link from "next/link";

const QuemSomos = () => {
  return (
    <main className="pb-14 mt-6 w-full md:max-w-[70%] max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-center">Área de cursos</h2>
        <div className="w-full border border-black/50 flex flex-col gap-2 rounded-md">
          <Link
            href="/matricula/agente-de-portaria"
            className="text-lg text-blue-500 hover:underline p-2 border-b border-black/50"
          >
            Agente de portaria
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-bold">Quem somos</h3>
        <p className="text-lg">Somos um projeto educativo privado de cursos livres a distância, buscando a excelência na capacitação de jovens e adultos.</p>
        <p className="text-lg mt-4">Os nossos cursos são 100% online, ideais para aqueles que já estão em atividade e querem se aprimorar mais, assim como para aquelas pessoas que estão fora do mercado de trabalho e necessitam de qualificação e atualização para seu currículo. Também servem para fins culturais e acadêmicos.</p>
        <p className="text-lg mt-4">Os cursos livres estão de acordo com as Diretrizes e Bases da Educação Nacional, Lei nº 9.394/96, Decreto nº 5.154/04, como uma modalidade de educação e podem emitir certificação válida em todo território nacional. Não temos reconhecimento do MEC justamente porque os cursos são livres e não necessitam de regulamentação.</p>
        <p className="text-lg mt-4">O material de estudo pode ser lido online ou adquirido através de download e é inteiramente gratuito. Somente cobramos uma taxa de serviços administrativos se você quiser solicitar o envio do Certificado.</p>
        <p className="text-lg mt-4">Nossa meta é aprimorar nossos cursos e ajudar a inserir cada vez mais pessoas no mercado de trabalho. Para sugestões e dúvidas entre em contato conosco!</p>
      </div>
    </main>
  );
};

export default QuemSomos;
