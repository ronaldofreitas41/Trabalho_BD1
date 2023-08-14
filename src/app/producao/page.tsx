import Image from "next/image";
import { ListProducao } from "../components/production/list";
import { AddProductionDialog } from "../components/production/addProductionDialog";

const Breadcrumbs = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a>Home</a>
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
        <p>Gerenciamento de Animais</p>
        <AddProductionDialog/>
      </div>
      <ListProducao/>
    </main>
  );
}
