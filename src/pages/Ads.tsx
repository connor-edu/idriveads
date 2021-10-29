import { Table } from "antd";
import type { ColumnType } from "antd/lib/table";
import { Link } from "react-router-dom";
import type { Ad } from "../ads";
import { ads } from "../ads";

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
    dataIndex: "rpm",
    title: "RPM",
    sorter: (a, b) => {
      return a.rpm - b.rpm;
    },
  },
];

const Ads = () => {
  return (
    <div>
      <Link to={"/"}>&lt;-</Link>
      <Table columns={columns} dataSource={ads} bordered size={"small"} />
    </div>
  );
};

export default Ads;
