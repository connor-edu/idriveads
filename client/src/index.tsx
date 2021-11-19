import { HTTPError } from "ky";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import ky from "./utils";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: async (key: any) => {
          try {
            /**
             * Attempt to make the request.
             */
            return await ky(key).json();
          } catch (e) {
            /**
             * If the request fails, check if the error was thrown by `ky` or the browser.
             */
            let error;
            try {
              /**
               * If the error was thrown by `ky` attempt to convert the error response to JSON
               * If that fails, then give throw the orginal error.
               */
              if (e instanceof HTTPError) {
                error = await e.response.json();
              }
            } catch (_e) {}

            if (error) {
              throw error;
            }

            throw e;
          }
        },
      }}>
      <Provider store={store}>
        <App />
      </Provider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
