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
