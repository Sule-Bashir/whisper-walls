import { Hono } from "hono";
import { redis } from "@devvit/web/server";

export const stats = new Hono();

stats.get("/", async (c) => {
  const totalGames =
    Number(await redis.get("stats:games")) || 0;

  const totalReactions =
    Number(await redis.get("stats:reactions")) || 0;

  const highestScore =
    Number(await redis.get("stats:highscore")) || 0;

  return c.json({
    totalGames,
    totalReactions,
    highestScore,
  });
});

stats.post("/game", async (c) => {
  const body = await c.req.json<{
    score: number;
  }>();

  const totalGames =
    (Number(await redis.get("stats:games")) || 0) + 1;

  await redis.set(
    "stats:games",
    String(totalGames)
  );

  const highScore =
    Number(await redis.get("stats:highscore")) || 0;

  if (body.score > highScore) {
    await redis.set(
      "stats:highscore",
      String(body.score)
    );
  }

  return c.json({
    success: true,
  });
});
stats.post("/reaction", async (c) => {
  const total =
    (Number(await redis.get("stats:reactions")) || 0) + 1;

  await redis.set(
    "stats:reactions",
    String(total)
  );

  return c.json({
    total,
  });
});
