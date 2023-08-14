"use client";

import { useProducao } from "@/contexts/production";
import { Producao } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

type Props = {
  animals: Producao[];
};

export const Table = () => {
  const { producao, removeProducao } = useProducao();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Identificador (ID)</th>
            <th>Ano</th>
            <th>Mes</th>
            <th>Dia</th>
            <th>Quatidade</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {producao.map((producao, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{producao.id_ord}</td>
              <td>{producao.dia_ord}</td>
              <td>{producao.mes_ord}</td>
              <td>{producao.ano_ord}</td>
              <td>{producao.qntLeite_ord}</td>
              <td className="flex gap-2">
                <button className="btn btn-ghost">
                  <FaRegEdit />
                </button>
                <button
                  className=" btn btn-ghost"
                  //onClick={() => removeProducao(producao.id_ord)}
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
