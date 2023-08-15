export interface Animal {
  brinco_gado: string;
  sexo_gado: string;
  raca_gado: string;
  datanasci_gado: string;
  nome_gado: string;
  faz_cnpj: string;
}
export interface Producao {
  id_ord: string;
  ano_ord: string;
  mes_ord: string;
  dia_ord: string;
  qntleite_ord: string;
  gado_brinco: string;
}
export interface Fazenda {
  cnpj_faz: string;
  endereco_faz: string;
  nome_faz: string;
  area_faz: string;
  prop_cpf: string;
}
export interface Farmer {
  cpf_prop: string;
  nome_prop: string;
  datanasc_prop: string;
  telefone_prop: string;
  endereco_prop: string;
}
