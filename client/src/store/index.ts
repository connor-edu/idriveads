import { createStore, combineReducers } from "redux";
import { accountsReducer } from "./account";

export * from "./account";

const rootReducer = combineReducers({
  account: accountsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);
