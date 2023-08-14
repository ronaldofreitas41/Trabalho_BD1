import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex bg-green-800 justify-between p-6 text-white">
      <Link href={"/productions"}>Producao</Link>
      <Link href={"/farmers"}>Fazendeiros</Link>
      <Link href={"/animals"}>Animais</Link>
      <Link href={"/farms"}>Fazendas</Link>
    </header>
  );
};
