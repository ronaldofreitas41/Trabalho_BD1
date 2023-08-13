import { Fazenda } from "@/types";
import { Table } from "./table";

export const FarmList = () => {
  return (
    <div className="bg-white p-4 border-2 rounded-md">
      <h3 className="text-xl">Lista de Fazendas</h3>
      <Table />
    </div>
  );
};
