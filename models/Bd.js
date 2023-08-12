import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Ronaldo20',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = {pool}
