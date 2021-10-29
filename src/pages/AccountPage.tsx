import { css } from "@emotion/css";
import { Avatar, List, Menu, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyCutePicture from "../assets/00e0b55f154bfd2f6af4579eb780ae44.png";
import type { AppState } from "../store";

const AccountPage = () => {
  const account = useSelector((state: AppState) => state.account);
  return (
    <div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 1em;
        `}>
        <Link to={"/"}>&lt;-</Link>
        <Typography.Title
          level={2}
          className={css`
            display: inline-flix;
            margin-right: 1em;
            margin-left: 1em;
            margin-bottom: 0 !important;
          `}>
          {account!.name}!
        </Typography.Title>
        <Avatar src={MyCutePicture} size={"large"} />
      </div>
      <Menu selectedKeys={[]} selectable={false} mode={"vertical"}>
        <Menu.Item>Account Information</Menu.Item>
        <Menu.Item>
          <Link to={"/account/payment"}>Payment Information</Link>
        </Menu.Item>
        <Menu.Item>App Settings</Menu.Item>
      </Menu>
    </div>
  );
};

export default AccountPage;
