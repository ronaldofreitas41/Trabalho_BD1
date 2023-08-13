"use client";

import { useFazenda } from "@/contexts/farmContexts";
import { Fazenda } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

type Props = {
  fazendas: Fazenda[];
};

export const Table = () => {
  const { fazendas, removeFazenda } = useFazenda();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nome da Fazenda</th>
            <th>Endereco</th>
            <th>CNPJ</th>
            <th>CPF Dono</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fazendas.map((fazendas, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{fazendas.nome_faz}</td>
              <td>{fazendas.endereco_faz}</td>
              <td>{fazendas.cnpj_faz}</td>
              <td>{fazendas.prop_cpf}</td>
              <td>{fazendas.area_faz}</td>
              <td className="flex gap-2">
                <button className="btn btn-ghost">
                  <FaRegEdit />
                </button>
                <button
                  className=" btn btn-ghost"
                  onClick={() => removeFazenda(fazendas.cnpj_faz)}
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
