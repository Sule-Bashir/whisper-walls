import { Hono } from "hono";
import type { UiResponse } from "@devvit/web/shared";
import { context } from "@devvit/web/server";
import { createPost } from "../core/post";

export const menu = new Hono();

menu.post("/post-create", async (c) => {
  try {
    const post = await createPost();

    return c.json<UiResponse>(
      {
        navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
      },
      200
    );
  } catch (error) {
    return c.json<UiResponse>(
      {
        showToast: `Create post failed: ${String(error)}`,
      },
      400
    );
  }
});

menu.post("/example-form", async (c) => {
  return c.json<UiResponse>(
    {
      showForm: {
        name: "exampleForm",
        form: {
          title: "Submit a Whisper",
          fields: [
            {
              type: "paragraph",
              name: "message",
              label: "Your anonymous whisper",
              helpText: "Share your confession anonymously.",
              required: true,
            },
          ],
        },
      },
    },
    200
  );
});
