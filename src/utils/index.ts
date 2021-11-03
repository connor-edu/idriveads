import baseKy from "ky";
import type { ky as KyInterface } from "ky/distribution/types/ky";

async function getToken(): Promise<string | null> {
  return localStorage.getItem("idriveadsAccessToken");
}

export const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://idriveads-server.herokuapp.com/";
const ky: KyInterface = baseKy.extend({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        const token = await getToken();
        if (token) {
          req.headers.set("Authorization", token);
        }
      },
    ],
  },
});

export default ky;
