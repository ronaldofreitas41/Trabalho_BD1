import { pool } from "@/database";
import { Producao } from "@/types";
import { throws } from "assert";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM ordenha")
    .then((res) => res.rows);
  return NextResponse.json(data);
}
export async function POST(request: Request) {
  const body: Producao = await request.json();

  console.log(body);

  const data = await pool
    .query(
      "INSERT INTO ordenha (id_ord,ano_ord,mes_ord,dia_ord,qntLeite_ord,gado_brinco) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        body.id_ord,
        body.ano_ord,
        body.mes_ord,
        body.dia_ord,
        body.qntLeite_ord,
        body.gado_brinco,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
