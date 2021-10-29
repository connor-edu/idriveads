import { css } from "@emotion/css";

export const container = css`
  margin: 0 auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  max-width: 1100px;
  width: 100%;
  @media only screen and (min-width: 601px) {
    width: 98%;
  }
  @media only screen and (min-width: 993px) {
    width: 96%;
  }
  @media only screen and (min-width: 1200px) {
    width: 94%;
  }
`;
