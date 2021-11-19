import React, { memo } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";

const LoaderContainer = css`
  margin: 24px 0;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledLoader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300;
`;

const Loader = () => (
  <div className={cx(LoaderContainer)}>
    <div className={cx(StyledLoader)}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
    </div>
  </div>
);

export default memo(Loader);
