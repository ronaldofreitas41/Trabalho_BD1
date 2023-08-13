"use client";

import { useAnimal } from "@/contexts/animalContext";
import { Animal } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

type Props = {
  animals: Animal[];
};

export const Table = () => {
  const { animals, removeAnimal } = useAnimal();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Brinco</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{animal.nome_gado}</td>
              <td>{animal.datanasci_gado}</td>
              <td>{animal.raca_gado}</td>
              <td>{animal.sexo_gado}</td>
              <td>{animal.brinco_gado}</td>
              <td className="flex gap-2">
                <button className="btn btn-ghost">
                  <FaRegEdit />
                </button>
                <button
                  className=" btn btn-ghost"
                  onClick={() => removeAnimal(animal.brinco_gado)}
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
