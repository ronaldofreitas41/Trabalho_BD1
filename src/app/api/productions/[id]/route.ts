import { pool } from "@/database";
import { Producao } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM ordenha WHERE id_ord = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Essa produção não Existe!" },
      { status: 404 }
    );
  }

  await pool.query("DELETE FROM ordenha WHERE id_ord = $1", [params.id]);

  return NextResponse.json({ message: "Registro excluído com sucesso" });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists = await pool
    .query("SELECT * FROM ordenha WHERE id_ord = $1", [params.id])
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Essa produção não Existe!" },
      { status: 404 }
    );
  }

  const body: Producao = await request.json();

  const res = await pool.query(
    "UPDATE ordenha SET ano_ord = $2, mes_ord = $3, dia_ord = $4, gado_brinco = $5, qntLeite_ord = $6 WHERE id_ord = $1",
    [
      body.id_ord,
      body.ano_ord,
      body.mes_ord,
      body.dia_ord,
      body.gado_brinco,
      body.qntLeite_ord,
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
