import Link from "next/link";
import { AddAnimalDialog } from "../components/animals/addAnimalDialog";
import { AnimalTable } from "../components/animals/AnimalTable";

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
        <AddAnimalDialog />
      </div>
      <AnimalTable />
    </main>
  );
}
