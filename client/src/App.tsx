import { css, cx } from "@emotion/css";
import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSWR from "swr";
import { container } from "./comonents/container";
import Loader from "./comonents/Loader";
import AccountPage from "./pages/AccountPage";
import AdPage from "./pages/AdPage";
import Ads from "./pages/Ads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Miles from "./pages/Miles";
import UserProfile from "./pages/UserProfile";
import AdEnrollmentHistory from "./pages/AdEnrollmentHistory";
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
      <Layout
        className={css`
          background: #fff !important;
        `}>
        <div
          className={cx(
            container,
            css`
              margin-top: 3rem;
            `
          )}>
          <Routes>
            <Route path={"/ads/:id"} element={<AdPage />} />
            <Route path={"/ads"} element={<Ads />} />
            <Route path={"/miles"} element={<Miles />} />
            <Route path={"/history"} element={<AdEnrollmentHistory />} />
            <Route path={"/account/profile"} element={<UserProfile />} />
            <Route path={"/account/payment"} element={<Payment />} />
            <Route path={"/account"} element={<AccountPage />} />
            <Route index element={<Home />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
