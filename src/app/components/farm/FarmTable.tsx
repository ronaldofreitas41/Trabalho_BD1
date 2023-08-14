import { Fazenda } from "@/types";
import { RemoveFarm } from "./RemoveFarm";
import { EditFarmDialog } from "./EditFarmDialog";

const getFazendas = async () => {
  const res = await fetch("http://localhost:3000/api/farms",{
    cache:"no-cache",
  });
  const fazendas: Fazenda[] = await res.json();

  return fazendas;
};

export const Table = async () => {
  const fazendas = await getFazendas();
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
                <EditFarmDialog farm={fazendas}/>
                <RemoveFarm id={fazendas.cnpj_faz} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
