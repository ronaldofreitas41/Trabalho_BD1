import Link from "next/link";
import Image from "next/image";
import foto from "./1.png"; 

export const Header = () => {
  return (
    <header className="flex bg-green-800 justify-between p-6 text-white">
      <div className="flex">
      
        <Link href={"/productions"} className="mr-4">
          Producao
        </Link>
        <Link href={"/farmers"} className="mr-4">
          Fazendeiros
        </Link>
        <Link href={"/animals"} className="mr-4">
          Animais
        </Link>
        <Link href={"/farms"}>Fazendas</Link>
      </div>
    </header>
  );
};
