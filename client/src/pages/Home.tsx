import { css } from "@emotion/css";
import { Layout, List, Typography } from "antd";
import { useSelector } from "react-redux";
import type { AppState } from "../store";
import { Link } from "react-router-dom";

const Home = () => {
  const account = useSelector((state: AppState) => state.account);
  return (
    <Layout.Content>
      <Link
        to={"/account"}
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}>
        <Typography.Title
          level={2}
          className={css`
            display: inline-flix;
            margin-right: 1em;
            margin-bottom: 0 !important;
          `}>
          Hello {account!.name}!
        </Typography.Title>
      </Link>

      <List
        bordered
        className={css`
          margin-top: 2rem !important;
        `}>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/ads"}>Ads Catalog</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/ads"}>Campaigns</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/miles"}>Track My Miles</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/account/payment"}>Earnings</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/ads"}>Ratings</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/history"}>History</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={3}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/account"}>My Account</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
      </List>
    </Layout.Content>
  );
};

export default Home;
