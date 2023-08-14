import Image from "next/image";
import { AddFarmerDialog } from "../components/farmer/addFarmerDialog";
import { FarmerTable } from "../components/farmer/FarmerTable";
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
          <a>Fazendeiros</a>
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
        <p>Gerenciamento de Fazendeiros</p>
        <AddFarmerDialog />
      </div>
      <FarmerTable />
    </main>
  );
}
