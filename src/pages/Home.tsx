import { css } from "@emotion/css";
import { Avatar, Col, Row, Typography } from "antd";
import MyCutePicture from "../assets/00e0b55f154bfd2f6af4579eb780ae44.png";
import { useSelector } from "react-redux";
import type { AppState } from "../store";
import { Link } from "react-router-dom";

const GridItem = css`
  padding: 4em 0;
  width: 100%;
  text-align: center;
  border: 1px solid #aaa;
  font-size: 16px;
`;

const Home = () => {
  const account = useSelector((state: AppState) => state.account);
  return (
    <div>
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
        <Avatar src={MyCutePicture} size={"large"} />
      </Link>
      <Row
        className={css`
          margin-top: 2em;
        `}>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>Ads Catalog</Link>
          </div>
        </Col>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>Map</Link>
          </div>
        </Col>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>Campaigns</Link>
          </div>
        </Col>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>Earnings</Link>
          </div>
        </Col>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>Rating</Link>
          </div>
        </Col>
        <Col span={8}>
          <div className={GridItem}>
            <Link to={"/ads"}>History</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
