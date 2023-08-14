import { pool } from "@/database";
import { Fazenda } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM fazenda WHERE cnpj_faz = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Essa fazenda não Existe!" },
      { status: 404 }
    );
  }

  await pool.query("DELETE FROM fazenda WHERE cnpj_faz = $1", [params.id]);

  return NextResponse.json({ message: "Registro excluído com sucesso" });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM fazenda WHERE cnpj_faz = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Essa fazenda não Existe!" },
      { status: 404 }
    );
  }

  const body: Fazenda = await request.json();

  const res = await pool.query(
    "UPDATE fazenda SET nome_faz = $2, area_faz = $3, prop_cpf = $4, endereco_faz = $5 WHERE cnpj_faz = $1",
    [
      body.cnpj_faz,
      body.nome_faz,
      body.area_faz,
      body.prop_cpf,
      body.endereco_faz,
    ]
  );

  if (res.rowCount === 0) {
    return NextResponse.json(
      { error: "Não foi possível atualizar o registro" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Registro atualizado com sucesso" });
}
