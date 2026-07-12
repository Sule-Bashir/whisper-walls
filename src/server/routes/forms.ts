import { Hono } from "hono";
import type { UiResponse } from "@devvit/web/shared";
import { redis } from "@devvit/web/server";

type WhisperFormValues = {
  message?: string;
};

export const forms = new Hono();

forms.post("/example-submit", async (c) => {
  const { message } = await c.req.json<WhisperFormValues>();

  const text = typeof message === "string"
    ? message.trim()
    : "";

  if (!text) {
    return c.json<UiResponse>(
      {
        showToast: "❌ Whisper cannot be empty.",
      },
      400
    );
  }

  const existing = await redis.get("community_whispers");

  const whispers = existing
    ? JSON.parse(existing)
    : [];

  whispers.push({
    text,
    createdAt: Date.now(),
  });

  await redis.set(
    "community_whispers",
    JSON.stringify(whispers)
  );

  return c.json<UiResponse>(
    {
      showToast: "✅ Whisper submitted successfully!",
    },
    200
  );
});
