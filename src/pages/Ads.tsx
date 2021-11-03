import { Table } from "antd";
import type { ColumnType } from "antd/lib/table";
import { Link } from "react-router-dom";
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
  },
];

const Ads = () => {
  const { data } = useSWR<Ad[]>("ads");
  return (
    <div>
      <Link to={"/"}>&lt;-</Link>
      <Table columns={columns} dataSource={data} loading={!data} bordered size={"small"} />
    </div>
  );
};

export default Ads;
