import { Router } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import db from "./db";
import { getUser, stripe } from "./utils";

const app = Router();

/**
 * Fetch the json webtoken secret from the environment and places into a reusable buffer.
 */
export const JWT_SECRET = Buffer.from(process.env.JWT_SECRET! as string, "hex");

app.post("/login", async (req, res) => {
  /**
   * Query the database looking any account that matches the request's email.
   */
  const { rows } = await db.query("select * from idriveads_accounts where lower(email) = lower($1)", [req.body.email]);

  /**
   * If there are no rows return, we return early from this route.
   */

  if (rows.length === 0) {
    return res.status(401).json({
      message: "Account not found.",
    });
  }

  /**
   * Load the first account from the list.
   */

  const [account] = rows;

  /**
   * Verify the password hash that is stored in the database with the one provided,
   * if they do not match, we do an early return.
   */

  if (!(await argon2.verify(account.password, req.body.password))) {
    return res.status(401).json({
      message: "Account not found.",
    });
  }

  /**
   * Sign a new web token that encodes the account id and expires in 12 hours.
   */

  const accessToken = jwt.sign(
    {
      account_id: account.id.toString(),
    },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  /**
   * Return the new token to the user.
   */

  return res.json({ accessToken });
});

app.post("/register", async (req, res) => {
  const { rows } = await db.query("select * from idriveads_accounts where lower(email) = lower($1)", [req.body.email]);

  if (rows.length !== 0) {
    return res.status(401).json({
      message: "Email already in use.",
    });
  }

  if (!req.body.email || typeof req.body.email !== "string") {
    return res.status(400).json({
      message: "Missing or invalid email.",
    });
  }

  if (!req.body.name || typeof req.body.name !== "string") {
    return res.status(400).json({
      message: "Missing or invalid name.",
    });
  }

  if (!req.body.password || typeof req.body.password !== "string") {
    return res.status(400).json({
      message: "Missing or invalid password.",
    });
  }

  const passwordHash = await argon2.hash(req.body.password);

  const stripe_account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      transfers: {
        requested: true,
      },
    },
    business_type: "individual",
    email: req.body.email,
    individual: {
      email: req.body.email,
      first_name: req.body.name,
    },
  });

  const {
    rows: [account],
  } = await db.query(
    "INSERT INTO idriveads_accounts (name, email, password, stripe_account) values ($1, $2, $3, $4) RETURNING *",
    [req.body.name, req.body.email, passwordHash, stripe_account.id]
  );

  const accessToken = jwt.sign(
    {
      account_id: account.id.toString(),
    },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return res.json({ accessToken });
});

app.get("/account", getUser, (req, res) => {
  if (req.user) {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      vehicle_make: req.user.vehicle_make,
      vehicle_model: req.user.vehicle_model,
      vehicle_year: req.user.vehicle_year,
      zipcode: req.user.zipcode,
      miles_per_day: req.user.miles_per_day,
    });
  } else {
    return res.status(401).json({
      message: "Not logged in.",
    });
  }
});

const fieldsToUpdate = ["name", "vehicle_make", "vehicle_model", "vehicle_year", "miles_per_day", "zipcode"] as const;

type Fields = typeof fieldsToUpdate[number];

app.post("/account", getUser, async (req, res) => {
  const updatedFields: { [key in Fields]?: string } = {};

  for (const field of fieldsToUpdate) {
    if (req.body[field] && typeof req.body[field] === "string") {
      updatedFields[field] = req.body[field];
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return res.json(null);
  }

  const query =
    "update idriveads_accounts SET " +
    Object.keys(updatedFields)
      .map((key, i) => {
        return `${key} = $${i + 2}`;
      })
      .join(", ") +
    " where id = $1";

  await db.query(query, [req.user!.id, ...Object.values(updatedFields)]);
  return res.json(null);
});

export default app;
