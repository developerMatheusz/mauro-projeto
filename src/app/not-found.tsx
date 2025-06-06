import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const NotFound = async () => {
  return (
    <>
      <SeoMeta title={"Página não encontrada"} />
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-[#035373]">
                404
              </span>
              <h1 className="h2 mb-4 text-[#035373]">Página não encontrada</h1>
              <div className="content text-[#035373]">
                <p>
                  A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
                </p>
              </div>
              <Link href="/" className="btn bg-[#035373] text-white mt-8">
                Voltar para página inicial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
