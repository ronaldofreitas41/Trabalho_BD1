import { pool } from "@/database";
import { Farmer } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM proprietario")
    .then((res) => res.rows);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body: Farmer = await request.json();

  const data = await pool
    .query(
      "INSERT INTO proprietario (nome_prop,datanasc_prop,telefone_prop,cpf_prop,endereco_prop) VALUES ($1,$2,$3,$4,$5)",
      [
        body.nome_prop,
        body.datanasc_prop,
        body.telefone_prop,
        body.cpf_prop,
        body.endereco_prop,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
