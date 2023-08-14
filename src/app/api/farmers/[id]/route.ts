import { pool } from "@/database";
import { Farmer } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM proprietario WHERE cpf_prop = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Esse fazendeiro não Existe!" },
      { status: 404 }
    );
  }

  await pool.query("DELETE FROM proprietario WHERE cpf_prop = $1", [params.id]);

  return NextResponse.json({ message: "Registro excluído com sucesso" });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM proprietario WHERE cpf_prop = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Esse Farmer não Existe!" },
      { status: 404 }
    );
  }

  const body: Farmer = await request.json();

  const res = await pool.query(
    "UPDATE proprietario SET nome_prop = $2, datanasc_prop = $3, endereco_prop = $4, telefone_prop = $5 WHERE cpf_prop = $1",
    [
      body.cpf_prop,
      body.nome_prop,
      body.datanasc_prop,
      body.endereco_prop,
      body.telefone_prop,
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
