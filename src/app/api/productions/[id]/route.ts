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

export async function POST(
  request: Request,

  { params }: { params: { id: string } }
) {
  const body: Producao = await request.json();
 
  const alreadyExists = await pool
    .query(
      "SELECT * FROM gadoleite WHERE sexo_gado = 'F' AND brinco_gado = $1;",
      [params.id]
    )
    .then((res) => res.rows);

  if (alreadyExists.length === 0) {
    return NextResponse.json(
      { error: "Machos não produzem Leite" },
      { status: 403 }
    );
  }
  const data = await pool

    .query(
      "INSERT INTO ordenha (id_ord,ano_ord,mes_ord,dia_ord,qntleite_ord,gado_brinco) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        body.id_ord,
        body.ano_ord,
        body.mes_ord,
        body.dia_ord,
        body.qntleite_ord,
        body.gado_brinco,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const alreadyExists2 = await pool
    .query(
      "SELECT * FROM gadoleite WHERE sexo_gado = 'F' AND brinco_gado = $1;",
      [params.id]
    )
    .then((res) => res.rows);

  if (alreadyExists2.length === 0) {
    return NextResponse.json(
      { error: "Machos não produzem Leite" },
      { status: 403 }
    );
  }
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
    "UPDATE ordenha SET ano_ord = $2, mes_ord = $3, dia_ord = $4, gado_brinco = $5, qntleite_ord = $6 WHERE id_ord = $1",
    [
      body.id_ord,
      body.ano_ord,
      body.mes_ord,
      body.dia_ord,
      body.gado_brinco,
      body.qntleite_ord,
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
