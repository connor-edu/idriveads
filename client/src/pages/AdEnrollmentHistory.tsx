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
    dataIndex: "enrolled_on",
    title: "Date Enrolled",
    sorter: (a, b) => {
      return new Date(b.enrolled_on).getTime() - new Date(a.enrolled_on).getTime();
    },
    render(v) {
      return new Date(v).toLocaleDateString();
    },
  },
];

const AdEnrollmentHistory = () => {
  const { data } = useSWR<Ad[]>("ads/history");
  const navigation = useNavigate();
  return (
    <div>
      <PageHeader
        title={"Ad Enrollment History"}
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
      />
    </div>
  );
};

export default AdEnrollmentHistory;
