import { Hono } from "hono";
import { redis, context } from "@devvit/web/server";

export const achievements = new Hono();

achievements.get("/", async (c) => {
  const username = context.username ?? "anonymous";

  const highScore =
    Number(await redis.get("stats:highscore")) || 0;

  const streak =
    Number(await redis.get("streak:count")) || 0;

  let title = "New Player";
  let badge = "🌱";

  if (highScore >= 5) {
    title = "Whisper Explorer";
    badge = "🧭";
  }

  if (highScore >= 8) {
    title = "Mind Reader";
    badge = "🧠";
  }

  if (highScore === 10) {
    title = "Whisper Master";
    badge = "👑";
  }

  if (streak >= 7) {
    title = "Dedicated Player";
    badge = "🔥";
  }

  if (streak >= 30) {
    title = "Legend";
    badge = "🏆";
  }

  return c.json({
    username,
    badge,
    title,
    highScore,
    streak,
  });
});
