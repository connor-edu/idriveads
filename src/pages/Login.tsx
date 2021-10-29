import { css, cx } from "@emotion/css";
import { Alert, Button, Card, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { container } from "../comonents/container";
import { accounts, setAccount } from "../store";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setRegister] = useState(false);
  const dispatch = useDispatch();
  const login = useCallback((e) => {
    setError(null);
    const attempt = accounts.get(e.email);
    if (!attempt) {
      setError("Account not found.");
      return;
    }

    if (attempt.password !== e.password) {
      setError("Account not found.");
      return;
    }

    dispatch(setAccount(attempt));
  }, []);
  const register = useCallback((e) => {
    setError(null);
    const attempt = accounts.get(e.email);
    if (attempt) {
      setError("Account already found.");
      return;
    }

    if (e.password !== e.confirm_password) {
      setError("Passwords don't match");
      return;
    }

    const account = {
      id: Math.random() * 500242 + 1,
      name: e.name,
      email: e.email,
      password: e.password,
    };
    accounts.set(account.email, account);

    dispatch(setAccount(account));
  }, []);
  if (!isRegistering) {
    return (
      <div
        className={cx(
          container,
          css`
            margin-top: 3rem;
          `
        )}>
        <Form layout={"vertical"} onFinish={login}>
          <Card title={"Login"}>
            {error && (
              <Alert
                message={error}
                type={"error"}
                className={css`
                  margin-bottom: 1em !important;
                `}
              />
            )}
            <Form.Item label={"Email"} name={"email"}>
              <Input name={"email"} />
            </Form.Item>
            <Form.Item label={"Password"} name={"password"}>
              <Input name={"password"} type={"password"} />
            </Form.Item>
            <Form.Item
              className={css`
                & .ant-form-item-control-input-content {
                  display: flex;
                  justify-content: center;
                }
              `}>
              <Button htmlType={"submit"} type={"primary"}>
                Login
              </Button>
            </Form.Item>
            <Form.Item
              className={css`
                & .ant-form-item-control-input-content {
                  display: flex;
                  justify-content: center;
                }
              `}>
              <Button onClick={() => setRegister(true)} type={"link"}>
                Register
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  } else {
    return (
      <div
        className={cx(
          container,
          css`
            margin-top: 3rem;
          `
        )}>
        <Form layout={"vertical"} onFinish={register}>
          <Card title={"Register"}>
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
              <Input name={"name"} />
            </Form.Item>
            <Form.Item label={"Email"} name={"email"}>
              <Input name={"email"} />
            </Form.Item>
            <Form.Item label={"Password"} name={"password"}>
              <Input name={"password"} type={"password"} />
            </Form.Item>
            <Form.Item label={"Confirm Password"} name={"confirm_password"}>
              <Input name={"password"} type={"password"} />
            </Form.Item>
            <Form.Item
              className={css`
                & .ant-form-item-control-input-content {
                  display: flex;
                  justify-content: center;
                }
              `}>
              <Button htmlType={"submit"} type={"primary"}>
                Register
              </Button>
            </Form.Item>
            <Form.Item
              className={css`
                & .ant-form-item-control-input-content {
                  display: flex;
                  justify-content: center;
                }
              `}>
              <Button onClick={() => setRegister(true)} type={"link"}>
                Login
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
};

export default Login;
