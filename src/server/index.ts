import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {
  createServer,
  getServerPort,
} from "@devvit/web/server";

import { api } from "./routes/api";
import { whispers } from "./routes/whispers";
import { streak } from "./routes/streak";
import { achievements } from "./routes/achievements";
import { stats } from "./routes/stats";
import { leaderboard } from "./routes/leaderboard";

import { forms } from "./routes/forms";
import { menu } from "./routes/menu";
import { triggers } from "./routes/triggers";

const app = new Hono();
const internal = new Hono();

// Internal routes
internal.route("/menu", menu);
internal.route("/form", forms);
internal.route("/triggers", triggers);

// Public API routes
app.route("/api", api);
app.route("/api/whispers", whispers);
app.route("/api/streak", streak);
app.route("/api/achievements", achievements);
app.route("/api/stats", stats);
app.route("/api/leaderboard", leaderboard);

// Internal endpoints
app.route("/internal", internal);

serve({
  fetch: app.fetch,
  createServer,
  port: getServerPort(),
});
