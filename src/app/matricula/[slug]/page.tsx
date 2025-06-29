'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CursoModal from '@/components/CursoModal';
import { courses } from '@/app/mockData';
import MaskedInput from 'react-text-mask';

function CPFInput({ value, onChange, id, required }: any) {
  const cpfMask = [
    /\d/, /\d/, /\d/, '.', 
    /\d/, /\d/, /\d/, '.', 
    /\d/, /\d/, /\d/, '-', 
    /\d/, /\d/
  ];

  return (
    <MaskedInput
      mask={cpfMask}
      id={id}
      className="p-2 rounded border border-gray-300"
      placeholder="000.000.000-00"
      guide={false}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

const MatriculaSlug = () => {
  const params = useParams();
  const slug = typeof params.slug === 'string'
    ? params.slug
    : Array.isArray(params.slug) ? params.slug[0] : '';
  const [formData, setFormData] = useState({
    horas: '',
    name: '',
    email: '',
    cpf: '',
  });
  const [showModal, setShowModal] = useState(false);

  const todosCursos = Object.values(courses).flat();

  const curso = todosCursos.find(c => c.slug === slug);

  if (!curso) {
    return (
      <main className="w-full h-64 lg:max-w-[70%] mx-auto max-w-[95%] flex items-center justify-center flex-col text-center">
        <h1 className="text-3xl font-bold">Curso não encontrado</h1>
        <p>Verifique o link e tente novamente.</p>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === 'cpf') {
      const onlyNumbers = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [id]: onlyNumbers }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
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

  return (
    <main>
      <div className="mt-6 w-full lg:max-w-[70%] max-w-[95%] mx-auto">
        <h1 className="text-3xl font-bold">{curso.title}</h1>

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          <div className="w-full h-80 relative">
            <Image
              src={curso.coverImage}
              alt={`Banner do curso ${curso.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl font-semibold">Matricule-se neste curso gratuitamente.</h2>
            <p className="text-lg">{curso.description}</p>
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
              placeholder="Digite seu nome (apenas nome/sobrenome)"
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
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="cpf">CPF *</label>
            <CPFInput
              value={formData.cpf}
              onChange={handleChange}
              id="cpf"
              required
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
        <CursoModal
          nomeCurso={curso.title}
          name={formData.name}
          horas={formData.horas}
          cpf={formData.cpf}
          slug={curso.slug}
          curso={curso}
        />
      )}
    </main>
  );
};

export default MatriculaSlug;
