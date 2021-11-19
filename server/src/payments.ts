import { Router } from "express";
import { getUser, stripe } from "./utils";

const app = Router();

app.get("/", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const stripeAccount = await stripe.accounts.retrieve(req.user!.stripe_account);

  if (stripeAccount.details_submitted === false) {
    return res.json({
      code: "setup",
    });
  }

  return res.json({ code: "success" });
});

app.get("/setup", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const stripeAccount = await stripe.accounts.retrieve(req.user!.stripe_account);

  if (stripeAccount.details_submitted) {
    return res.json(null);
  }

  const link = await stripe.accountLinks.create({
    account: stripeAccount.id,
    refresh_url: req.headers.referer,
    return_url: req.headers.referer,
    type: "account_onboarding",
  });

  return res.json(link.url);
});
app.get("/dashboard", getUser, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const stripeAccount = await stripe.accounts.retrieve(req.user!.stripe_account);

  if (!stripeAccount.details_submitted) {
    return res.json(null);
  }

  const link = await stripe.accounts.createLoginLink(stripeAccount.id);

  return res.json(link.url);
});

export default app;
