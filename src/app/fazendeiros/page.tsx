import Image from "next/image";
import { FazendeirosList } from "../components/farmer/list";
import { AddFarmerDialog } from "../components/farmer/addFarmerDialog";

const Breadcrumbs = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Animais</a>
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
        <AddFarmerDialog />
      </div>
      <FazendeirosList />
    </main>
  );
}
