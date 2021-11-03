import { css } from "@emotion/css";
import { Descriptions, PageHeader, Result, Statistic } from "antd";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import type { Ad } from "../ads";
import Loader from "../comonents/Loader";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, error } = useSWR<Ad>("ads/" + id);
  const history = useHistory();
  if (error) {
    return <Result status={"404"} />;
  }

  if (!ad) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        ghost={false}
        title={ad.name}
        subTitle={ad.company}
        onBack={() => {
          history.goBack();
        }}>
        <Descriptions>
          <Descriptions.Item label={"Description"}>{ad.description}</Descriptions.Item>
        </Descriptions>
        <Statistic
          title={"CPM"}
          value={`$${ad.cpm}`}
          style={{
            marginRight: 32,
          }}
        />
      </PageHeader>
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
