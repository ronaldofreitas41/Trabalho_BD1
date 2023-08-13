export interface Animal {
  brinco_gado: string;
  sexo_gado: string;
  raca_gado: string;
  datanasci_gado: string;
  nome_gado: string;
  faz_cnpj: string;
}
export interface Producao {
  id_ord:number;
  ano_ord:number;
  mes_ord:number;
  dia_ord:number;
  qntLeite_ord:number;
  gado_brinco:string;
}
export interface Fazenda {
  cnpj_faz:string;
  endereco:string;
  nome_faz:string;
  area_faz:number;
  prop_cpf:string;
}
export interface Fazendeiro {
  cpf_prop:string;
  nome_prop:string;
  datanac_prop:string;
  telefone_prop:string;
  endereco_prop:string;
}
