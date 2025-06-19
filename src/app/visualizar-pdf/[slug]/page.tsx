import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const pdfMap: Record<string, string> = {
  'agente-de-portaria': '/visualizar-pdf/agente-de-portaria.pdf',
  'recepcionista-de-hotel': '/visualizar-pdf/recepcionista-de-hotel.pdf'
};

export default async function ViewPDFPage({ params }: Props) {
  const { slug } = await params; 
  const pdfPath = pdfMap[slug];

  if (!pdfPath) {
    return notFound();
  }

  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Visualizando: {slug.replace(/-/g, ' ')}
      </h1>
      <div className="w-full h-[90vh] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={pdfPath}
          title={`PDF - ${slug}`}
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
