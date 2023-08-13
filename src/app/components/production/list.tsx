import { Animal } from "@/types";
import { Table } from "./table";

export const AnimalsList = () => {
  return (
    <div className="bg-white p-4 border-2 rounded-md">
      <h3 className="text-xl">Lista de Producao</h3>
      <Table />
    </div>
  );
};
