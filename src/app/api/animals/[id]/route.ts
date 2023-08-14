import { pool } from "@/database";
import { Animal } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM gadoleite WHERE brinco_gado = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Esse animal não Existe!" },
      { status: 404 }
    );
  }

  await pool.query("DELETE FROM gadoleite WHERE brinco_gado = $1", [params.id]);

  return NextResponse.json({ message: "Registro excluído com sucesso" });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM gadoleite WHERE brinco_gado = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Esse animal não Existe!" },
      { status: 404 }
    );
  }

  const body: Animal = await request.json();

  const res = await pool.query(
    "UPDATE gadoleite SET nome_gado = $2, datanasci_gado = $3, faz_cnpj = $4, raca_gado = $5, sexo_gado = $6 WHERE brinco_gado = $1",
    [
      body.brinco_gado,
      body.nome_gado,
      body.datanasci_gado,
      body.faz_cnpj,
      body.raca_gado,
      body.sexo_gado,
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
