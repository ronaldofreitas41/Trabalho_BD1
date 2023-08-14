import { Farmer } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { RemoveFarmer } from "./RemoveFarmer";
import { EditFarmerDialog } from "./EditFarmerDialog";

const getFarmers = async () => {
  const res = await fetch("http://localhost:3000/api/farmers",{
    cache:"no-cache",
  });
  const farmers: Farmer[] = await res.json();

  return farmers;
};

export const FarmerTable = async () => {
  const farmers = await getFarmers();

  return (
    <div>
      <h3 className="text-xl">Lista de Fazendeiros</h3>

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
            {farmers.map((farmer, id) => (
              <tr key={id}>
                <td>{farmer.nome_prop}</td>
                <td>{farmer.datanasc_prop}</td>
                <td>{farmer.telefone_prop}</td>
                <td>{farmer.endereco_prop}</td>
                <td>{farmer.cpf_prop}</td>
                <td className="flex gap-2">
                  <EditFarmerDialog farmer={farmer}/>
                  <RemoveFarmer cpf={farmer.cpf_prop} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
