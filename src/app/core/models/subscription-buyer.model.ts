export interface SubscriptionBuyer {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  logoUrl?: string;
  logo: { id: number };
}
