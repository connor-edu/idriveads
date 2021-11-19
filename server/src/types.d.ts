declare global {
  namespace Express {
    interface Request {
      user?: Account | undefined;
    }
  }
}

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  zipcode?: string;
  miles_per_day?: string;
  stripe_account: string;
}
