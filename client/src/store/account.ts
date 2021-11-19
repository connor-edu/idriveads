export interface Account {
  id: number;
  email: string;
  password: string;
  name: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  zipcode?: string;
  miles_per_day?: string;
}
export const accounts = new Map<string, Account>();

accounts.set("test@email.com", {
  id: 1,
  email: "test@email.com",
  password: "password",
  name: "My Name",
});

export const SET_ACCOUNT = "SET_ACCOUNT";
export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: Account | null;
}
export function setAccount(account: Account | null): SetAccountAction {
  return {
    type: SET_ACCOUNT,
    payload: account,
  };
}

export function accountsReducer(state: Account | null = null, action: SetAccountAction): Account | null {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}
