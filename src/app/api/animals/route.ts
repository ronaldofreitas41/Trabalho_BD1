import { pool } from "@/database";
import { Animal } from "@/types";
import { throws } from "assert";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM gadoleite")
    .then((res) => res.rows);
  return NextResponse.json(data);
}     

export async function POST(request: Request) {
  const body: Animal = await request.json();


  const data = await pool
    .query(
      "INSERT INTO gadoleite (nome_gado,datanasci_gado,raca_gado,brinco_gado,sexo_gado,faz_cnpj) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        body.nome_gado,
        body.datanasci_gado,
        body.raca_gado,
        body.brinco_gado,
        body.sexo_gado,
        body.faz_cnpj,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
