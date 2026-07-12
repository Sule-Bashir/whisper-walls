import { Hono } from "hono";
import { redis } from "@devvit/web/server";

export const leaderboard = new Hono();

type LeaderboardEntry = {
  username: string;
  score: number;
  playedAt: number;
};

// ======================
// GET TOP 10
// ======================
leaderboard.get("/", async (c) => {
  const saved = await redis.get("leaderboard");

  const scores: LeaderboardEntry[] = saved
    ? JSON.parse(saved)
    : [];

  scores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return b.playedAt - a.playedAt;
  });

  return c.json({
    leaderboard: scores.slice(0, 10),
  });
});

// ======================
// SUBMIT SCORE
// ======================
leaderboard.post("/", async (c) => {
  const body = await c.req.json<{
    username: string;
    score: number;
  }>();

  console.log("===== LEADERBOARD POST =====");
  console.log("Body:", body);

  const username =
    body.username?.trim() || "Anonymous";

  const saved = await redis.get("leaderboard");

  const scores: LeaderboardEntry[] = saved
    ? JSON.parse(saved)
    : [];

  // Look for an existing player
  const existing = scores.find(
    (player) =>
      player.username.toLowerCase() ===
      username.toLowerCase()
  );

  if (existing) {
    // Keep only the player's highest score
    if (body.score > existing.score) {
      existing.score = body.score;
      existing.playedAt = Date.now();
    }
  } else {
    scores.push({
      username,
      score: body.score,
      playedAt: Date.now(),
    });
  }
// Remove any accidental duplicate usernames
const unique = new Map<string, LeaderboardEntry>();

for (const player of scores) {
  const key = player.username.toLowerCase();

  const current = unique.get(key);

  if (
    !current ||
    player.score > current.score ||
    (player.score === current.score &&
      player.playedAt > current.playedAt)
  ) {
    unique.set(key, player);
  }
}

scores.length = 0;
scores.push(...unique.values());
  // Sort leaderboard
  scores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return b.playedAt - a.playedAt;
  });

  await redis.set(
    "leaderboard",
    JSON.stringify(scores)
  );

  return c.json({
    success: true,
  });
});

// ======================
// RESET LEADERBOARD
// ======================
leaderboard.post("/reset", async (c) => {
  await redis.set("leaderboard", JSON.stringify([]));

  return c.json({
    success: true,
    message: "Leaderboard cleared.",
  });
});
