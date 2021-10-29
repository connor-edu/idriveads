import { css } from "@emotion/css";
import { Descriptions, PageHeader, Statistic } from "antd";
import { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ads } from "../ads";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const ad = useMemo(() => {
    return ads.find((a) => a.id === Number(id))!;
  }, [id]);
  const history = useHistory();
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
          title={"RPM"}
          value={`$${ad.rpm}`}
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
