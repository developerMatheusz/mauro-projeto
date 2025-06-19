import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return(
        <nav className="w-full">
            <Link href="https://wa.me/5598999038722" target="_blank" className="w-full bg-[#F79800] flex items-center justify-center gap-2 text-lg p-4">
                <Image src="/whatsapp.svg" alt="Whatsapp" width={30} height={30} />
                Atendimento pelo Whatsapp
            </Link>
            <div className="flex items-center justify-center w-full py-6">
                <Link href="/" className="flex items-center justify-center gap-4 w-full">
                    <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
                    <div className="flex flex-col gap-1">
                        <p className="uppercase text-2xl font-extrabold text-[#065473]">Academia do Conhecimento</p>
                        <p className="text-lg font-light">Cursos online para se qualificar.</p>
                    </div>
                </Link>
            </div>
            <div className="w-full bg-[#065473] p-2 lg:text-lg text-base uppercase flex items-center justify-center gap-4 text-white">
                <Link href="/" className=" hover:text-[#F2A950] transition duration-300">Início</Link>
                <Link href="/certificado" className=" hover:text-[#F2A950] transition duration-300">Certificados</Link>
                <Link href="/quem-somos" className=" hover:text-[#F2A950] transition duration-300">Quem somos</Link>
            </div>
        </nav>
    )
}

export default Navbar;
