'use client';

import { useState } from 'react';

const ValidarCertificado = () => {
  const [uuidInput, setUuidInput] = useState('');
  const [resultado, setResultado] = useState('');

    const handleValidar = () => {
        try {
            const rawString = decodeURIComponent(escape(atob(uuidInput)));

            const regex = /^.+-\d{8}-\d+$/;

            if (regex.test(rawString)) {
                setResultado('Certificado digital válido.');
            } else {
                setResultado('UUID decodificado, mas formato inválido.');
            }
        } catch {
            setResultado('UUID inválido ou erro na decodificação.');
        }
    };

  return (
    <main>
      <div className="mt-6 w-full lg:max-w-[70%] max-w-[95%] mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">Valide seu certificado digital</h1>

        <input
          type="text"
          placeholder="Cole o UUID aqui"
          value={uuidInput}
          onChange={(e) => setUuidInput(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <button
          onClick={handleValidar}
          className="w-44 bg-[#065473] text-white font-semibold py-3 rounded hover:bg-[#034b58] transition"
        >
          Validar
        </button>

        {resultado && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-lg">
            {resultado}
          </div>
        )}
      </div>
    </main>
  );
};

export default ValidarCertificado;
