import { css } from "@emotion/css";
import { Avatar, List, PageHeader, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MyCutePicture from "../assets/00e0b55f154bfd2f6af4579eb780ae44.png";
import type { AppState } from "../store";

const AccountPage = () => {
  const account = useSelector((state: AppState) => state.account);
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
        onBack={() => {
          navigate("/");
        }}
        title={
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}>
            <Typography.Title
              level={2}
              className={css`
                display: inline-flix;
                margin-right: 0.5em;
                margin-bottom: 0 !important;
              `}>
              {account!.name}
            </Typography.Title>
            <Avatar src={MyCutePicture} size={"large"} />
          </div>
        }
      />
      <List
        bordered
        className={css`
          margin-top: 2rem !important;
        `}>
        <List.Item>
          <Typography.Title
            level={4}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/account/profile"}>Edit Profile</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
        <List.Item>
          <Typography.Title
            level={4}
            className={css`
              margin-bottom: 0 !important;
            `}>
            <Link to={"/account/payment"}>Payment Information</Link>
          </Typography.Title>

          <List.Item.Meta />
        </List.Item>
      </List>
    </div>
  );
};

export default AccountPage;
