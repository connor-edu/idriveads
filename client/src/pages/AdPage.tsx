import { css } from "@emotion/css";
import { Button, Descriptions, Form, Modal, PageHeader, Result, Select, Statistic, Input } from "antd";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import type { Ad } from "../ads";
import Loader from "../comonents/Loader";
import ky from "../utils";

const AdPage = () => {
  const { id } = useParams<"id">();
  const { data: ad, error } = useSWR<Ad>("ads/" + id);
  const navigate = useNavigate();
  const [reporting, setReporting] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAdEnrollment = useCallback(async () => {
    setLoading(true);
    try {
      if (!ad?.enrolled) {
        await ky.post(`ads/${ad?.id}`);
        await mutate(`ads/${ad?.id}`);
      } else {
        await ky.delete(`ads/${ad?.id}`);
        await mutate(`ads/${ad?.id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [ad?.id, ad?.enrolled]);

  if (error) {
    return <Result status={"404"} />;
  }

  if (!ad) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
        title={ad.name}
        subTitle={ad.company}
        extra={
          <Button size={"small"} danger type={"primary"} onClick={() => setReporting(true)}>
            Report
          </Button>
        }
        onBack={() => {
          navigate(-1);
        }}>
        <Descriptions>
          <Descriptions.Item label={"Description"}>{ad.description}</Descriptions.Item>
        </Descriptions>
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          `}>
          <Statistic
            title={"CPM"}
            value={`$${ad.cpm}`}
            style={{
              marginRight: 32,
            }}
          />
          <Button loading={loading} type={"primary"} size={"large"} onClick={toggleAdEnrollment}>
            {ad.enrolled ? "Unenroll in Campaign" : "Enroll in Campaign"}
          </Button>
        </div>
      </PageHeader>
      <Modal
        visible={reporting}
        title={"Report Ad"}
        onCancel={() => setReporting(false)}
        onOk={() => setReporting(false)}
        okButtonProps={{
          danger: true,
        }}>
        <Form layout={"vertical"}>
          <Form.Item label={"Reason"}>
            <Select>
              <Select.Option value={"spam"}>Spam</Select.Option>
              <Select.Option value={"distracting"}>Distracting</Select.Option>
              <Select.Option value={"inappropriate"}>Inappropriate</Select.Option>
              <Select.Option value={"violent"}>Violent</Select.Option>
              <Select.Option value={"racist"}>Racist</Select.Option>
              <Select.Option value={"other"}>Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={"Description"}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
        `}>
        <iframe
          width={"600"}
          height={"450"}
          style={{
            border: 0,
            margin: "3em auto",
          }}
          loading={"lazy"}
          allowFullScreen
          src={
            "https://www.google.com/maps/embed/v1/place?key=AIzaSyAkHHSNG7MpneN2Ou9jiE2hRcUYBRCVJUA&q=Space+Needle,Seattle+WA"
          }
        />
      </div>
    </>
  );
};

export default AdPage;
