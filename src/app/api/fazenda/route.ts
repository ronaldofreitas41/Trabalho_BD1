import { pool } from "@/database";
import {  Fazenda } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM fazenda")
    .then((res) => res.rows);
  return NextResponse.json(data);
}
export async function UPDATE(request: Request) {//Conferir com o Duque
  const body: Fazenda = await request.json();

  const {
    nome_faz,
    cnpj_faz,
    endereco_faz,
    area_faz,
    prop_cpf,
  
  } = body;

  try {
    const result = await pool.query(
      "UPDATE fazenda SET nome_faz = $1, cnpj_faz = $2, endereco_faz = $3, prop_cpf = $4, WHERE area_faz = $6",
      [nome_faz, cnpj_faz, endereco_faz, prop_cpf, area_faz]
    );

    return NextResponse.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar registro" });
  }
}

export async function DELETE(request: Request) {//Conferir com o Duque
  const body: { brinco_gado: string } = await request.json();

  const brincoGado = body.brinco_gado;

  try {
    const result = await pool.query(
      "DELETE FROM fazenda WHERE brinco_gado = $1",
      [brincoGado]
    );

    return NextResponse.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir registro" });
  }
}
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
        body.prop_cpf
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
