import { css } from "@emotion/css";
import { Alert, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  const [error, setError] = useState();
  return (
    <div>
      <Link to={"/account"}>&lt;-</Link>
      <Form layout={"vertical"}>
        <Card title={"Payment Information"}>
          {error && (
            <Alert
              message={error}
              type={"error"}
              className={css`
                margin-bottom: 1em !important;
              `}
            />
          )}
          <Form.Item label={"Bank Name"} name={"bank"}>
            <Input />
          </Form.Item>
          <Form.Item label={"Routing Number"} name={"router"}>
            <Input name={"email"} />
          </Form.Item>
          <Form.Item label={"Account Number"} name={"account"}>
            <Input name={"password"} />
          </Form.Item>
          <Form.Item
            className={css`
              & .ant-form-item-control-input-content {
                display: flex;
                justify-content: center;
              }
            `}>
            <Button htmlType={"submit"} type={"primary"}>
              Submit
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default Payment;
