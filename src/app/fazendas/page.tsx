import Image from "next/image";
import { FarmList } from "../components/farm/list";
import { AddAnimalDialog } from "../components/animals/addAnimalDialog";

const Breadcrumbs = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Fazendas</a>
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
        <p>Gerenciamento de Fazendas</p>
        <AddAnimalDialog />
      </div>
      <FarmList />
    </main>
  );
}