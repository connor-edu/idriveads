import { css } from "@emotion/css";
import { Alert, Button, Card, Form, Input, InputNumber, PageHeader, Typography } from "antd";
import { HTTPError } from "ky";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import type { AppState } from "../store";
import ky from "../utils";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useSelector((state: AppState) => state.account);
  const save = useCallback(async (e) => {
    setError(null);
    setLoading(false);

    console.log(e);

    try {
      await ky
        .post("auth/account", {
          json: {
            name: e.name,
            vehicle_make: e.vehicle_make,
            vehicle_model: e.vehicle_model,
            vehicle_year: `${e.vehicle_year}`,
            zipcode: e.zipcode,
            miles_per_day: `${e.miles_per_day}`,
          },
        })
        .json<{
          accessToken: string;
        }>();
      mutate("auth/account");
    } catch (e) {
      if (e instanceof HTTPError) {
        const err = await e.response.json();
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
        title={"User Profile"}
        onBack={() => {
          navigate("/account");
        }}
      />
      <Form
        initialValues={{
          name: account?.name,
          vehicle_make: account?.vehicle_make,
          vehicle_model: account?.vehicle_model,
          vehicle_year: account?.vehicle_year,
          zipcode: account?.zipcode,
          miles_per_day: account?.miles_per_day,
        }}
        layout={"vertical"}
        onFinish={save}
        className={css`
          margin-top: 2rem !important;
        `}>
        <Card>
          {error && (
            <Alert
              message={error}
              type={"error"}
              className={css`
                margin-bottom: 1em !important;
              `}
            />
          )}
          <Form.Item label={"Name"} name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label={"ZIP Code"} name={"zipcode"}>
            <Input name={"zipcode"} />
          </Form.Item>
          <Form.Item label={"Average Miles Driven per Day"} name={"miles_per_day"} help={"in miles"}>
            <InputNumber
              name={"year"}
              className={css`
                &.ant-input-number {
                  width: 100%;
                }
              `}
            />
          </Form.Item>
          <Typography.Title level={4}>Vehicle Information</Typography.Title>
          <Form.Item label={"Make"} name={"vehicle_make"}>
            <Input name={"make"} />
          </Form.Item>
          <Form.Item label={"Model"} name={"vehicle_model"}>
            <Input name={"model"} />
          </Form.Item>
          <Form.Item label={"Year"} name={"vehicle_year"}>
            <InputNumber
              name={"year"}
              className={css`
                &.ant-input-number {
                  width: 100%;
                }
              `}
            />
          </Form.Item>
          <Form.Item
            className={css`
              & .ant-form-item-control-input-content {
                display: flex;
                justify-content: center;
              }
            `}>
            <Button htmlType={"submit"} type={"primary"} loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default UserProfile;
