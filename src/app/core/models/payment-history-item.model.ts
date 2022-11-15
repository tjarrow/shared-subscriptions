export interface PaymentHistoryItem {
  amount: number;
  currency: string;
  status: string;
  cardBrand: CardBrand;
  logos: string;
  cardLast4Numbers: string;
  dateTime: Date;
}

export enum CardBrand {
  americanExpress = 'American Express',
  dinersClub = 'Diners Club',
  discover = 'Discover',
  Jcb = 'JCB',
  masterCard = 'MasterCard',
  unionPay = 'UnionPay',
  visa = 'Visa',
  unknown = 'Unknown'
}

export const CardBrandFileName = {
  'american express': 'american-express.svg',
  'diners club': 'diners-club.svg',
  'discover': 'discover.svg',
  'jcb': 'jcb.svg',
  'mastercard': 'master-card.svg',
  'master-card': 'master-card.svg',
  'unionpay': 'union-pay.svg',
  'visa': 'visa.svg',
  'unknown': 'unknown.svg'
}
