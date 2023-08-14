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
      </ul>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col p-8 gap-8">
      <Breadcrumbs />

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Link href={"productions"}>
            <div className="card glass">
              <div className="card-body">
                <div className="card-title">
                  Produção
                </div>
              </div>
            </div>
          </Link>
          <Link href={"animals"}>
            <div className="card glass">
              <div className="card-body">
                <div className="card-title">
                  Gado Leite
                </div>
              </div>
            </div>
          </Link>
          <Link href={"farmers"}>
            <div className="card glass">
              <div className="card-body">
                <div className="card-title">
                  Fazendeiros
                </div>
              </div>
            </div>
          </Link>
          <Link href={"farms"}>
            <div className="card glass">
              <div className="card-body">
                <div className="card-title">
                  Fazendas
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
