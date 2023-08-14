import { Fazendeiro } from "@/types";
import { Table } from "./table";

export const FazendeirosList = () => {
  return (
    <div className="bg-white p-4 border-2 rounded-md">
      <h3 className="text-xl">Lista de Fazendeiros</h3>
      <Table />
    </div>
  );
};
