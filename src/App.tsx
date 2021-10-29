import { css, cx } from "@emotion/css";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { container } from "./comonents/container";
import AccountPage from "./pages/AccountPage";
import AdPage from "./pages/AdPage";
import Ads from "./pages/Ads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import type { AppState } from "./store";

const App = () => {
  const account = useSelector((state: AppState) => state.account);
  if (account === null) {
    return <Login />;
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
