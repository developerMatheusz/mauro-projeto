'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CursoModal from '@/components/CursoModal';

const MatriculaSlug = () => {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';

  const [formData, setFormData] = useState({
    horas: '',
    name: '',
    email: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { horas, name, email } = formData;

    if (!horas || !name || !email) {
      alert('Preencha todos os campos!');
      return;
    }

    setShowModal(true);
  };

  console.log(slug)

  return (
    <main>
      <div className="mt-6 w-full lg:max-w-[70%] max-w-[95%] mx-auto">
        <h1 className="text-3xl font-bold">
          {slug == "atendente-comercial" ? "Curso Online Atendente Comercial" : "Cursos Online Agente de Portaria"}
        </h1>

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          <div className={`w-full ${slug === "atende-de-portaria" ? "h-64" : "h-80"} relative`}>
            <Image
              src={
                slug === 'agente-de-portaria'
                  ? '/images/course/course-1.png'
                  : '/images/course/course-2.png'
              }
              alt="Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl font-semibold">Matricule-se neste curso gratuitamente.</h2>
            <p className="text-lg">
              {slug === 'agente-de-portaria' ? "Objetivo geral de capacitar o aluno para atuar com eficiência e segurança como agente de portaria em diferentes tipos de instituições, compreendendo suas atribuições, postura profissional, atendimento ao público e procedimentos operacionais." : "Capacitar o aluno para atuar com excelência na função de atendente comercial em diversos segmentos do mercado, desenvolvendo habilidades de comunicação, atendimento ao cliente, postura profissional, organização de rotinas administrativas e técnicas de vendas, visando um atendimento eficiente, cordial e voltado à satisfação do cliente."}
            </p>
          </div>
        </div>

        <div className="w-full mt-20 flex flex-col gap-2">
          <h3 className="text-3xl font-semibold">Dados de Acesso</h3>
          <div className="w-full bg-[#F2A950] rounded-md p-2 flex items-center text-lg gap-2">
            <Image src="/info.svg" alt="Info" width={50} height={50} />
            É importante cadastrar corretamente um email válido para o envio do certificado!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="horas">Carga Horária</label>
            <select
              id="horas"
              value={formData.horas}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="">Selecione</option>
              <option value="20">20 horas</option>
              <option value="40">40 horas</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300"
              placeholder="Digite seu email"
            />
          </div>

          <div></div>

          <div className="col-span-1 md:col-span-3">
            <button
              type="submit"
              className="w-44 bg-[#F2A950] text-white font-semibold py-3 rounded hover:bg-[#e4983e] transition"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <div className="w-full mt-6 p-2 bg-[#F2A950] text-lg rounded-md">
          Atenção! O cadastro é pessoal e intransferível! Duas pessoas não podem utilizar o mesmo cadastro!
        </div>
      </div>

      {showModal && (
        <CursoModal nomeCurso={slug === "atendente-comercial" ? "Atendente Comercial" : "Agente de Portaria"} horas={formData.horas} slug={slug} />
      )}
    </main>
  );
};

export default MatriculaSlug;
