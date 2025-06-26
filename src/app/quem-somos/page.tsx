import Link from "next/link";
import { courses } from "../mockData";

const QuemSomos = () => {
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
        <h3 className="text-3xl font-bold">Quem somos</h3>
        <p className="text-lg">A Academia do Conhecimento é uma iniciativa privada de educação a distância, focada em oferecer cursos livres que garantem alta qualidade na formação de jovens e adultos.</p>
        <p className="text-lg mt-4">Nossas capacitações são 100% online, ideais tanto para profissionais em atividade que desejam aprimorar suas habilidades quanto para quem busca recolocação, necessitando enriquecer o currículo. Também atendem a interesses culturais e acadêmicos.</p>
        <p className="text-lg mt-4">Todos os nossos cursos livres estão alinhados à Lei de Diretrizes e Bases da Educação Nacional (Lei 9.394/96) e ao Decreto 5.154/04, e emitem certificados com validade em todo o território nacional. Por se enquadrarem na modalidade de educação livre, não dependem de credenciamento junto ao MEC.</p>
        <p className="text-lg mt-4">O material didático está disponível gratuitamente para leitura online ou download. A cobrança ocorre somente quando o aluno solicita a emissão do certificado, por meio de uma taxa administrativa.</p>
        <p className="text-lg mt-4">Nosso objetivo é aprimorar constantemente os cursos e contribuir para que cada vez mais pessoas ingressem ou avancem no mercado de trabalho. Para sugestões ou mais informações, entre em contato conosco!</p>
        <p className="text-lg mt-4 font-bold">Benefícios do Certificado</p>
        <p className="text-lg mt-4 pl-4">Atividades Complementares – Créditos acadêmicos adicionais em cursos de nível superior.</p>
        <p className="text-lg mt-4 pl-4">Prova de Títulos – Pontuação extra em processos seletivos públicos.</p>
        <p className="text-lg mt-4 pl-4">Progressão na Carreira – Critério para promoção de servidores públicos.</p>
        <p className="text-lg mt-4 pl-4">Aprimoramento Profissional – Reconhecimento e comprovação de novas competências.</p>
        <p className="text-lg mt-4 pl-4">Valorização do Currículo – Enriquecimento do histórico profissional.</p>
        <p className="text-lg mt-4 font-bold">Validação em Concursos Públicos</p>
        <p className="text-lg mt-4">Na maioria dos certames, sim; entretanto, em outros, não. Isso varia conforme as regras definidas no edital. Faça a leitura minuciosa de todo o documento, dando atenção especial à seção relativa à Prova de Títulos, para confirmar se são aceitos cursos livres de capacitação (conforme LDB nº 9.394/96 e Decreto nº 5.154/04).</p>
        <p className="text-lg mt-4">Observação: Cabe ao candidato verificar o edital específico de seu concurso para saber quais formações são exigidas. Cada certame estabelece critérios próprios, e não temos como conhecer detalhadamente as normas de cada um.</p>
        <p className="text-lg mt-4 font-bold">Academia do Conhecimento: posso confiar nesta plataforma?</p>
        <p className="text-lg mt-4">A Academia do Conhecimento é um portal educativo online que se destaca pela variedade de cursos gratuitos em diversas áreas do saber, permitindo que cada participante progrida de acordo com seu próprio ritmo. Embora o acesso às aulas não tenha custo, a emissão do certificado de conclusão requer um investimento, o que agrega valor para quem deseja oficializar e aprimorar suas competências profissionais.</p>
        <p className="text-lg mt-4 font-bold">Qual o preço do certificado de conclusão na Academia do Conhecimento?</p>
        <p className="text-lg mt-4">O custo do certificado varia conforme o formato escolhido:</p>
        <p className="text-lg mt-4">Certificado Digital: R$ 29,90 para qualquer curso. Após a confirmação do pagamento, o aluno pode fazer o download e imprimir o documento diretamente em sua área restrita.</p>
        <p className="text-lg mt-4">Esses recursos contribuem para a manutenção e evolução da plataforma, no suporte aos usuários e na criação de novos cursos sem custo.</p>
        <p className="text-lg mt-4 font-bold">Por que adquirir o certificado da Academia do Conhecimento é vantajoso?</p>
        <p className="text-lg mt-4">O verdadeiro diferencial do certificado está em sua aplicabilidade e no valor reconhecido pelo mercado de trabalho. Profissionais que buscam aprimorar habilidades específicas têm neste documento um comprovante de dedicação e know-how, valorizado por empregadores. Para quem almeja crescimento na carreira, esse certificado pode ser decisivo em processos seletivos internos, mostrando comprometimento com o aperfeiçoamento contínuo.
No ambiente acadêmico, ele pode ser contabilizado como horas complementares em cursos de graduação. Em concursos públicos, agrega pontos na “prova de títulos”, elevando suas chances de classificação.</p>
        <p className="text-lg mt-4 font-bold">Os cursos livres da Academia do Conhecimento têm aval do MEC?</p>
        <p className="text-lg mt-4">Todos os cursos da Academia do Conhecimento são oferecidos na modalidade de “cursos livres” — uma forma de educação não formal. Conforme a Lei de Diretrizes e Bases da Educação (Lei nº 9.394/1996), esses cursos não necessitam de autorização ou validação do MEC, pois não seguem carga horária mínima ou currículo fixo.</p>
        <p className="text-lg mt-4">O Decreto nº 5.154/2004 regulamenta a formação inicial e continuada de trabalhadores, incluindo os cursos livres, e a Deliberação CEE 14/97 do Conselho Estadual de Educação de São Paulo reconhece sua validade para comprovar qualificação profissional. Embora não substituam diplomas técnicos ou de graduação, são uma excelente opção de especialização curta — a legislação exige, no mínimo, 8 horas de carga.</p>
        <p className="text-lg mt-4 font-bold">Segurança e privacidade dos seus dados</p>
        <p className="text-lg mt-4">Na Academia do Conhecimento, a confidencialidade das informações dos alunos é prioridade. Seguimos rigorosamente a LGPD e o Marco Civil da Internet, assegurando que seus dados sejam tratados com total transparência e sigilo.</p>
        <p className="text-lg mt-4">Nosso Ambiente Virtual de Aprendizagem (AVA) foi desenvolvido por especialistas que adotam padrões internacionais de segurança. Realizamos auditorias regulares no código-fonte para identificar e corrigir possíveis vulnerabilidades, garantindo a robustez do sistema.</p>
        <p className="text-lg mt-4">Você estuda com tranquilidade, pois:</p>
        <p className="text-lg mt-4">Seus dados são utilizados exclusivamente para aprimorar sua experiência de aprendizado.</p>
        <p className="text-lg mt-4">Não compartilhamos informações com terceiros sem seu consentimento explícito.</p>
        <p className="text-lg mt-4">Estamos constantemente atualizando nossos processos de segurança para oferecer um ensino online de excelência.</p>
        <p className="text-lg mt-4">Ao optar pela Academia do Conhecimento, você concentra-se no seu desenvolvimento, enquanto cuidamos da proteção dos seus dados.</p>
      </div>
    </main>
  );
};

export default QuemSomos;
