import { pool } from "@/database";
import { Fazenda } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM fazenda")
    .then((res) => res.rows);
  return NextResponse.json(data);
}
("");

export async function POST(request: Request) {
  const body: Fazenda = await request.json();

  const data = await pool
    .query(
      "INSERT INTO fazenda (nome_faz,cnpj_faz,area_faz,endereco_faz,prop_cpf) VALUES ($1,$2,$3,$4,$5)",
      [
        body.nome_faz,
        body.cnpj_faz,
        body.area_faz,
        body.endereco_faz,
        body.prop_cpf,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
