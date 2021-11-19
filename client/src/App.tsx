import { css, cx } from "@emotion/css";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useSWR from "swr";
import { container } from "./comonents/container";
import Loader from "./comonents/Loader";
import AccountPage from "./pages/AccountPage";
import AdPage from "./pages/AdPage";
import Ads from "./pages/Ads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import type { Account, AppState } from "./store";
import { setAccount } from "./store";

const App = () => {
  const { data, error } = useSWR<Account>("auth/account", {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const dispatch = useDispatch();

  const account = useSelector((state: AppState) => state.account);

  useEffect(() => {
    dispatch(setAccount(data ?? null));
  }, [data]);

  if (error) {
    return <Login />;
  }

  if (!data || !account) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <div
          className={cx(
            container,
            css`
              margin-top: 3rem;
            `
          )}>
          <Switch>
            <Route path={"/ads/:id"} component={AdPage} />
            <Route path={"/ads"} component={Ads} />
            <Route path={"/account/payment"} component={Payment} />
            <Route path={"/account"} component={AccountPage} />
            <Route path={"/"} exact component={Home} />
          </Switch>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
