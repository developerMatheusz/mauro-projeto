import Image from "next/image";

const Banner = () => {
    return(
        <div className="w-full h-96 relative">
            <Image src="/images/course/course-1-banner.jpg" alt="Banner" fill className="object-cover" />
            <div className="absolute w-full h-full bg-black/50 flex items-center justify-center flex-col gap-2">
                <h1 className="text-center text-5xl font-bold text-white uppercase">Curso de Agente de Portaria</h1>
                <p className="text-center text-2xl font-semibold text-white">
                    Desenvolvimento pessoal e profissional
                </p>
            </div>
        </div>
    )
}

export default Banner;
