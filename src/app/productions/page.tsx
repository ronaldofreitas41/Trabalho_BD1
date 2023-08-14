import Image from "next/image";
import { Table } from "../components/production/ProductionTable";
import { AddProductionDialog } from "../components/production/addProductionDialog";
import Link from "next/link";

const Breadcrumbs = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
      <li>
          <Link href={"/"}>
            Home
          </Link>
        </li>
        <li>
          <a>Produção</a>
        </li>
      </ul>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col p-8 gap-8">
      <Breadcrumbs />
      <div className="flex gap-4 items-center justify-between">
        <p>Gerenciamento de Produção</p>
        <AddProductionDialog />
      </div>
      <Table />
    </main>
  );
}
