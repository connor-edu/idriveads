import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import auth from "./auth";
import ads from "./ads";
import payments from "./payments";

/**
 * This is the core component to the server, as it "is the server."
 *
 * It is responsible for handling incoming requests and routing them to the correct function.
 */
const app = express();

/**
 * This setting allows us to correctly handle HTTPS requests when we're
 * behind a proxying that is terminating the SSL connection.
 *
 *
 * CLIENT -> LOAD BALANCER -> SERVER
 *      (https)          (http)
 */
app.set("trust proxy", true);
/**
 * This removes a default header that is present in all responses.
 */
app.set("x-powered-by", false);
/**
 * This setting determines how the "Etag" header is calcuated. The
 * header is used to determined when the content has not changed,
 * therefore the browser does not need to load it.
 */
app.set("etag", "strong");

/**
 * This middleware is applied to all requests, and attempts to parse all JSON
 * payloads from the request body, it then puts the JSON object into the "req.body" field.
 */

app.use(express.json());

/**
 * This middleware is just a small logger that logs every request to the terminal.
 */

app.use(morgan("tiny"));

/**
 * These options and middleware are used to control how CORS is handled on the server.
 *
 * Because I'm lazy, we're just allowing all requests from all origins.
 */
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: true,
  maxAge: 600,
};
app.use(cors(corsOptions));

app.use("/auth", auth);
app.use("/ads", ads);
app.use("/payments", payments);

app.listen(process.env.PORT || 3001);
