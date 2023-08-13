import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex bg-green-800 justify-between p-6 text-white">
      <Link href={"/producao"}>Producao</Link>
      <Link href={"/fazendeiros"}>Fazendeiros</Link>
      <Link href={"/"}>Animais</Link>
      <Link href={"/fazendas"}>Fazendas</Link>
    </header>
  );
};
