import { css, cx } from "@emotion/css";
import { Alert, Button, Card, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { HTTPError } from "ky";
import { container } from "../comonents/container";
import { mutate } from "swr";
import ky from "../utils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setRegister] = useState(false);
  const login = useCallback(async (e) => {
    setError(null);
    setLoading(false);

    try {
      const data = await ky
        .post("auth/login", {
          json: {
            email: e.email,
            password: e.password,
          },
        })
        .json<{
          accessToken: string;
        }>();
      window.localStorage.setItem("idriveadsAccessToken", data.accessToken);
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
  const register = useCallback(async (e) => {
    setError(null);
    setLoading(false);

    if (e.password !== e.confirm_password) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    console.log(e);

    try {
      const data = await ky
        .post("auth/register", {
          json: {
            email: e.email,
            password: e.password,
            name: e.name,
          },
        })
        .json<{
          accessToken: string;
        }>();
      window.localStorage.setItem("idriveadsAccessToken", data.accessToken);
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
          <Card title={"Login"} loading={loading}>
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
          <Card title={"Register"} loading={loading}>
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
              <Button onClick={() => setRegister(false)} type={"link"}>
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
