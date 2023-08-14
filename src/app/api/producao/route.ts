import { pool } from "@/database";
import { Producao } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM ordenha")
    .then((res) => res.rows);
  return NextResponse.json(data);
}
export async function UPDATE(request: Request) {//Conferir com o Duque
  const body: Producao = await request.json();

  const {
    qntLeite_ord,
    ano_ord,
    dia_ord,
    id_ord,
    mes_ord,
    gado_brinco,
  } = body;

  try {
    const result = await pool.query(
      "UPDATE ordenha SET qntLeite_ord = $1, ano_ord = $2, dia_ord = $3, mes_ord = $4, gado_brinco = $5 WHERE id_ord = $6",
      [qntLeite_ord, ano_ord, dia_ord, mes_ord, gado_brinco, id_ord]
    );

    return NextResponse.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar registro" });
  }
}

export async function DELETE(request: Request) {//Conferir com o Duque
  const body: { id_ord: string } = await request.json();

  const idOrd = body.id_ord;

  try {
    const result = await pool.query(
      "DELETE FROM ordenha WHERE id_ord = $1",
      [idOrd]
    );

    return NextResponse.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir registro" });
  }
}
export async function POST(request: Request) {
  const body: Producao = await request.json();

  const data = await pool
    .query(
      "INSERT INTO ordenha (qntLeite_ord,ano_ord,dia_ord,id_ord,mes_ord,gado_brinco) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        body.qntLeite_ord,
        body.ano_ord,
        body.dia_ord,
        body.id_ord,
        body.mes_ord,
        body.gado_brinco,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
