"use client";

import { useFazendeiro } from "@/contexts/farmerContext";
import { Animal } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

type Props = {
  animals: Animal[];
};

export const Table = () => {
  const { fazendeiros, removeFazendeiro } = useFazendeiro();
  const fazendeiroDateFormat = (date: string) => {
    return Intl.DateTimeFormat("pt-BR").format(new Date(date))
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Nome Proprietario</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {fazendeiros.map((fazendeiro, id) => (
            <tr key={id}>
              <td>{fazendeiro.nome_prop}</td>
              <td>{fazendeiroDateFormat(fazendeiro.datanac_prop)}</td>
              <td>{fazendeiro.telefone_prop}</td>
              <td>{fazendeiro.endereco_prop}</td>
              <td>{fazendeiro.cpf_prop}</td>
              <td className="flex gap-2">
                <button className="btn btn-ghost">
                  <FaRegEdit />
                </button>
                <button
                  className=" btn btn-ghost"
                  onClick={() => removeFazendeiro(fazendeiro.cpf_prop)}
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
