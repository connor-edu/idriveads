import { Router } from "express";
import db from "./db";
import { getUser } from "./utils";

const app = Router();

app.get("/", async (req, res) => {
  const { rows: ads } = await db.query("select * from idriveads_ads");

  return res.json(ads);
});

app.get("/history", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const { rows: ads } = await db.query(
    "SELECT e.enrolled_on, true as enrolled, a.* FROM idriveads_enrollment e LEFT JOIN idriveads_ads a ON (e.ad = a.id) WHERE e.account = $1",
    [req.user.id]
  );

  return res.json(ads);
});

app.get("/:id", getUser, async (req, res) => {
  const { rows: ads } = await db.query("select * from idriveads_ads where id = $1", [req.params.id]);

  if (ads.length > 0) {
    const [ad] = ads;
    if (req.user) {
      const { rows } = await db.query("select * from idriveads_enrollment where ad = $1 and account = $2", [
        ad.id,
        req.user.id,
      ]);
      if (rows.length > 0) {
        const [row] = rows;
        ad.enrolled = true;
        ad.enrolled_on = row.enrolled_on;
      }
    }

    return res.json(ad);
  } else {
    return res.sendStatus(404);
  }
});

app.post("/:id", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const { rows: ads } = await db.query("select * from idriveads_ads where id = $1", [req.params.id]);

  if (ads.length > 0) {
    const [ad] = ads;
    await db.query("INSERT INTO idriveads_enrollment (account, ad) VALUES ($1, $2) ON CONFLICT DO NOTHING", [
      req.user.id,
      ad.id,
    ]);

    return res.json(null);
  } else {
    return res.sendStatus(404);
  }
});

app.delete("/:id", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  await db.query("DELETE FROM idriveads_enrollment WHERE account = $1 AND ad = $2", [req.user.id, req.params.id]);

  return res.json(null);
});

export default app;
