export interface Service {
  id: number;
  name: string;
  description: string;
  logo?: { id: number };
  plans: Plan[];
  terms_link: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  maxSlots: number;
  price: number;
  sellerSavingPrice: number;
  buyerCostPrice: number;
  fee: number;
}

export enum ServiceName {
  Spotify = "spotify",
  Netflix = "netflix",
  DisneyPlus = "disney-plus"
}
