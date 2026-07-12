import { Hono } from "hono";
import { context, redis, reddit } from "@devvit/web/server";
import type {
  DecrementResponse,
  IncrementResponse,
} from "../../shared/api";

type ErrorResponse = {
  status: "error";
  message: string;
};

export const api = new Hono();

// ======================
// INIT
// ======================
api.get("/init", async (c) => {
  const { postId } = context;

  if (!postId) {
    console.error("API Init Error: postId not found in context");

    return c.json<ErrorResponse>(
      {
        status: "error",
        message: "postId is required but missing from context",
      },
      400
    );
  }

  try {
    const [count, username] = await Promise.all([
      redis.get("count"),
      reddit.getCurrentUsername(),
    ]);

    console.log("===== INIT API =====");
    console.log("Context:", context);
    console.log("Username:", username);

    const response = {
      type: "init",
      postId,
      count: count ? parseInt(count) : 0,
      username:
        username ??
        `Player-${Math.floor(Math.random() * 10000)}`,
    };

    console.log("INIT RESPONSE:", response);

    return c.json(response);
  } catch (error) {
    console.error("INIT ERROR:", error);

    return c.json<ErrorResponse>(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      400
    );
  }
});

// ======================
// INCREMENT
// ======================
api.post("/increment", async (c) => {
  const { postId } = context;

  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: "error",
        message: "postId is required",
      },
      400
    );
  }

  const count = await redis.incrBy("count", 1);

  return c.json<IncrementResponse>({
    type: "increment",
    postId,
    count,
  });
});

// ======================
// DECREMENT
// ======================
api.post("/decrement", async (c) => {
  const { postId } = context;

  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: "error",
        message: "postId is required",
      },
      400
    );
  }

  const count = await redis.incrBy("count", -1);

  return c.json<DecrementResponse>({
    type: "decrement",
    postId,
    count,
  });
});

// ======================
// TEMP RESET LEADERBOARD
// ======================
api.post("/reset-leaderboard", async (c) => {
  await redis.set("leaderboard", JSON.stringify([]));

  return c.json({
    success: true,
    message: "Leaderboard cleared.",
  });
});
