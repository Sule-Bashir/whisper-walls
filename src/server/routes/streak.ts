import { Hono } from "hono";
import { redis } from "@devvit/web/server";

export const streak = new Hono();

const challenges = [
  "Score 8/10 today!",
  "Finish all 10 rounds!",
  "React ❤️ three times!",
  "Play two games today!",
  "Score a perfect 10/10!",
];

streak.get("/", async (c) => {
  const today = new Date().toISOString().slice(0, 10);

  const lastVisit =
    (await redis.get("streak:lastVisit")) ?? "";

  let streakCount =
    Number(await redis.get("streak:count")) || 0;

  if (lastVisit !== today) {
    streakCount++;

    await redis.set("streak:lastVisit", today);

    await redis.set(
      "streak:count",
      String(streakCount)
    );
  }

  const challengeKey =
    "daily:challenge:" + today;

  let challenge =
    await redis.get(challengeKey);

  if (!challenge) {
    challenge =
      challenges[
        Math.floor(
          Math.random() * challenges.length
        )
      ];

    await redis.set(
      challengeKey,
      challenge ?? "Score 8/10 today"
    );
  }

  return c.json({
    streak: streakCount,
    challenge
  });
});
