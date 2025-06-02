export enum TipoTransacao {
  DESPESA = 1,
  RECEITA = 2,
}

export interface Totais {
  pessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}
