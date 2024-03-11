import moment from 'moment';

export function formatBRL(valor: string): string {
  return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function formatData(data: string): string {
  return moment(data).format("DD/MM/YYYY");
}