import { pool } from "@/database";
import { Fazendeiro } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await pool
    .query("SELECT * FROM proprietario")
    .then((res) => res.rows);
  return NextResponse.json(data);
}
export async function UPDATE(request: Request) {//Conferir com o Duque
  const body: Fazendeiro = await request.json();

  const {
    nome_prop,
    datanac_prop,
    telefone_prop,
    cpf_prop,
    endereco_prop,
  } = body;

  try {
    const result = await pool.query(
      "UPDATE proprietario SET nome_prop = $1, datanac_prop = $2, telefone_prop = $3, endereco_prop = $4 WHERE cpf_prop = $6",
      [nome_prop, datanac_prop, telefone_prop, endereco_prop, cpf_prop]
    );

    return NextResponse.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar registro" });
  }
}

export async function DELETE(request: Request) {//Conferir com o Duque
  const body: { cpf_prop: string } = await request.json();

  const cpf = body.cpf_prop;

  try {
    const result = await pool.query(
      "DELETE FROM proprietario WHERE cpf_prop = $1",
      [cpf]
    );

    return NextResponse.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir registro" });
  }
}
export async function POST(request: Request) {
  const body: Fazendeiro = await request.json();

  const data = await pool
    .query(
      "INSERT INTO proprietario (nome_gado,datanac_prop,telefone_prop,cpf_prop,sexo_gado,endereco_prop) VALUES ($1,$2,$3,$4,$5)",
      [
        body.nome_prop,
        body.datanac_prop,
        body.telefone_prop,
        body.cpf_prop,
        body.endereco_prop,
      ]
    )
    .then((res) => res.rows);
  return NextResponse.json(data);
}
