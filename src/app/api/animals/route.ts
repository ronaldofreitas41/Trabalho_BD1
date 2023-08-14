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
export async function UPDATE(request: Request) {
  const body: Animal = await request.json();

  const {
    nome_gado,
    datanasci_gado,
    raca_gado,
    brinco_gado,
    sexo_gado,
    faz_cnpj,
  } = body;

  try {
    const result = await pool.query(
      "UPDATE gadoleite SET nome_gado = $1, datanasci_gado = $2, raca_gado = $3, sexo_gado = $4, faz_cnpj = $5 WHERE brinco_gado = $6",
      [nome_gado, datanasci_gado, raca_gado, sexo_gado, faz_cnpj, brinco_gado]
    );

    return NextResponse.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar registro" });
  }
}

export async function DELETE(request: Request) {
  const body: { brinco_gado: string } = await request.json();
  const brincoGado = body.brinco_gado;
  const alreadyExists = await pool
    .query("SELECT * FROM gadoleite WHERE brinco_gado = $1",[
      brincoGado,
    ])
    .then((res) => res.rows);
  try {
    if(alreadyExists){
      await pool.query("DELETE FROM gadoleite WHERE brinco_gado = $1", [
        brincoGado,
      ]);
      return NextResponse.json({ message: "Registro excluído com sucesso" });
    }else{
      throw new Error("Esse animal não Existe!");
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir registro" });
  }
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
