import { css } from "@emotion/css";
import { Button, Card, PageHeader, Typography } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import ky from "../utils";

const Payment = () => {
  const navigate = useNavigate();
  const { data } = useSWR("payments");
  const setup = useCallback(async () => {
    const link = await ky.get("payments/setup").json<string>();
    location.href = link;
  }, []);
  const dashboard = useCallback(async () => {
    const link = await ky.get("payments/dashboard").json<string>();
    location.href = link;
  }, []);
  return (
    <div>
      <PageHeader
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
        title={"Payment Information"}
        onBack={() => {
          navigate("/account");
        }}
      />
      <Card
        loading={!data}
        className={css`
          margin-top: 2rem !important;
        `}>
        {data?.code === "setup" && (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}>
            <Typography.Title
              level={4}
              className={css`
                text-align: center;
              `}>
              Setup payment account to enable payouts.
            </Typography.Title>
            <Button size={"large"} type={"primary"} onClick={setup}>
              Setup
            </Button>
          </div>
        )}
        {data?.code === "success" && (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}>
            <Typography.Title
              level={4}
              className={css`
                text-align: center;
              `}>
              View Balance and Payout information in your Dashboard.
            </Typography.Title>
            <Button size={"large"} type={"primary"} onClick={dashboard}>
              Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Payment;
