import { css } from "@emotion/css";
import { PageHeader, Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

function formatTime(seconds: number): string {
  const days = Math.floor(seconds / 60 / 60 / 24);
  const hours = Math.floor((seconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((seconds - hours * 60 * 60) / 60);
  return `${`${days}`.padStart(2, "0")}:${`${hours}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")}`;
}

const DAYS_OF_THE_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function arrayRotate(arr: any, count: any) {
  count -= arr.length * Math.floor(count / arr.length);
  // eslint-disable-next-line prefer-spread
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

const Payment = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    const data = Array.from({ length: 7 }, () => {
      return Math.random() * 86;
    });
    data[6] = 58;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: arrayRotate(DAYS_OF_THE_WEEK, new Date().getDay()),
        datasets: [
          {
            data,
            borderColor: "#1890ff",
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            text: "Miles Driven This Week",
            display: true,
          },
        },
      },
    });
    // eslint-disable-next-line consistent-return
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <PageHeader
        className={css`
          background-color: #f0f2f5 !important;
          border-radius: 8px;
        `}
        ghost={false}
        title={"Milage History"}
        onBack={() => {
          navigate("/account");
        }}
      />
      <div
        className={css`
          display: flex;
          flex-direction: row;
          margin: 2rem 0;
          justify-content: space-around;
        `}>
        <Statistic title={"Total Time on Road"} value={formatTime(60 * 60 + 60)} />
        <Statistic title={"Total Miles"} value={25834} />
        <Statistic title={"YTD Miles"} value={15932} />
        <Statistic title={"Miles Today"} value={58} />
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Payment;
