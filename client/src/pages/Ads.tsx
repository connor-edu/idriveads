import { css } from "@emotion/css";
import { PageHeader, Table } from "antd";
import type { ColumnType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import type { Ad } from "../ads";

const columns: Array<ColumnType<Ad>> = [
  {
    dataIndex: "name",
    title: "Name",
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render(text, ad) {
      return <Link to={`/ads/${ad.id}`}>{text}</Link>;
    },
  },
  {
    dataIndex: "company",
    title: "Company",
    sorter: (a, b) => {
      return a.company.localeCompare(b.company);
    },
  },
  {
    dataIndex: "description",
    title: "Description",
  },
  {
    dataIndex: "cpm",
    title: "CPM",
    sorter: (a, b) => {
      return a.cpm - b.cpm;
    },
    align: "right",
    render(_, item) {
      return Number(item.cpm).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
];

const Ads = () => {
  const { data } = useSWR<Ad[]>("ads");
  const navigation = useNavigate();
  return (
    <div>
      <PageHeader
        title={"Ads Catalog"}
        onBack={() => navigation(-1)}
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
      />
      <Table
        className={css`
          margin-top: 2rem;
        `}
        columns={columns}
        dataSource={data}
        loading={!data}
        bordered
        tableLayout={"fixed"}
      />
    </div>
  );
};

export default Ads;
