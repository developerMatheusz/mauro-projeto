import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return(
        <div className="w-full border-t border-black/50 p-4 mt-14">
            <footer className="w-full max-w-[95%] lg:max-w-[70%] mx-auto">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-8 w-full">
                    <Link href="/" className="flex flex-col items-start justify-center gap-4">
                        <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
                        <div className="flex flex-col gap-1">
                            <p className="uppercase text-2xl font-extrabold text-[#065473]">Academia do Conhecimento</p>
                            <p className="text-lg font-light">Cursos online para se qualificar.</p>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-2">
                        <strong className="text-xl">Sobre nós</strong>
                        <p className="text-lg max-w-64">A Academia do Conhecimento é uma empresa especializada em ensino a distância.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <strong className="text-xl">Institucional</strong>
                        <Link href="/" className="text-lg hover:underline">Início</Link>
                        <Link href="/certificado" className="text-lg hover:underline">Certificado</Link>
                        <Link href="/quem-somos" className="text-lg hover:underline">Quem somos</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <strong className="text-xl">Cursos</strong>
                        <Link href="/matricula/agente-de-portaria" className="text-lg hover:underline">Agente de portaria</Link>
                        <Link href="/matricula/atendente-comercial" className="text-lg hover:underline">Atendente comercial</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
