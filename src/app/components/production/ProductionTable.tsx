import { Producao } from "@/types";
import { RemoveProducton } from "./RemoveProduction";
import { EditProductionDialog } from "./EditProductionDialog";

const getProductions = async () => {
  const res = await fetch("http://localhost:3000/api/productions",{
    cache:"no-cache",
  });
  const productions: Producao[] = await res.json();

  return productions;
};
export const Table = async () => {
  const productions = await getProductions();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Identificador (ID)</th>
            <th>Ano</th>
            <th>Mes</th>
            <th>Dia</th>
            <th>Brinco</th>
            <th>Quatidade</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          
          {productions.map((production, id) => (
            <tr key={id}>
              <td>{production.id_ord}</td>
              <td>{production.ano_ord}</td>
              <td>{production.mes_ord}</td>
              <td>{production.dia_ord}</td>
              <td>{production.gado_brinco}</td>
              <td>{production.qntleite_ord}</td>
              <td className="flex gap-2">
              <EditProductionDialog production ={production}/>
              <RemoveProducton id={production.id_ord}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
