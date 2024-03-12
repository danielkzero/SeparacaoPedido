export interface CabecalhoItem {
  CdChamadaCliente: string,  
  DataEmissaoPedido: Date, 
  NmCliente: string,
  itens: [{
    CdChamadaProduto: string;
    CdPedidosDadosPrincipais: number;
    Cubagem: number;
    DataAlteracao: Date;
    DataCadastro: Date;
    Finalizado: number;
    Manual: string;
    Observacao: string;
    Peso: number;
    QntConferidaItem: number;
    QntFaltanteItem: number;
    QntPedidaItem: number;
    TotalLiquido: number;
    UsuarioAlteracao: string;
    UsuarioCadastro: string;
    Volume: number;
    data_alteracao: Date;
    data_cadastro: Date;
    descricao: string,
    EAN13: string,
  }]
}


export interface SeparacaoItem {
  CdChamadaProduto: string;
  CdPedidosDadosPrincipais: number;
  Cubagem: number;
  DataAlteracao: Date;
  DataCadastro: Date;
  Finalizado: number;
  Manual: string;
  Observacao: string;
  Peso: number;
  QntConferidaItem: number;
  QntFaltanteItem: number;
  QntPedidaItem: number;
  TotalLiquido: number;
  UsuarioAlteracao: string;
  UsuarioCadastro: string;
  Volume: number;
  data_alteracao: Date;
  data_cadastro: Date;
  descricao: string,
  EAN13: string,
}