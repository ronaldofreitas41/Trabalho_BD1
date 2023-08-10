const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Xablau2002',
  port: 5432, // Porta padrão do PostgreSQL
});

app.get('/consulta', async (req, res) => {
  try {
    const consulta = 'SELECT * FROM nome_da_tabela;';
    const result = await pool.query(consulta);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).json({ error: 'Erro na consulta' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
