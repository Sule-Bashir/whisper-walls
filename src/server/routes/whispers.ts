import { Hono } from "hono";
import { redis } from "@devvit/web/server";

export const whispers = new Hono();

// Default whispers shown before users submit their own
const defaultWhispers = [
  "I accidentally ghosted my boss for three days.",
  "I still sleep with a teddy bear.",
  "I pretended to know coding in my interview.",
  "I ate someone else's lunch at work.",
  "I failed my driving test four times.",
  "I still use '123456' as one password.",
  "I skipped class just to watch football.",
  "I laughed during a serious meeting.",
  "I told my mom I was studying but I was gaming.",
  "I secretly enjoy pineapple on pizza.",
];

// Get one random whisper
whispers.get("/random", async (c) => {
  const saved = await redis.get("community_whispers");

  const community = saved
    ? JSON.parse(saved)
    : [];

  const allWhispers = [
    ...defaultWhispers,
    ...community.map((w: { text: string }) => w.text),
  ];

  const whisper =
    allWhispers[Math.floor(Math.random() * allWhispers.length)];

  return c.json({
    whisper,
  });
});

// Submit a whisper
whispers.post("/", async (c) => {
  const body = await c.req.json<{ text: string }>();

  const text = body.text?.trim();

  if (!text) {
    return c.json(
      {
        success: false,
        message: "Whisper cannot be empty.",
      },
      400
    );
  }

  const saved = await redis.get("community_whispers");

  const community = saved
    ? JSON.parse(saved)
    : [];

  community.push({
    text,
    createdAt: Date.now(),
  });

  await redis.set(
    "community_whispers",
    JSON.stringify(community)
  );

  return c.json({
    success: true,
    total: community.length,
  });
});

// Save a community reaction
whispers.post("/react", async (c) => {
  const body = await c.req.json<{
    whisper: string;
    reaction: string;
  }>();

  const key = `reaction:${body.whisper}`;

  const saved = await redis.get(key);

  const reactions = saved
    ? JSON.parse(saved)
    : {
        funny: 0,
        sad: 0,
        crazy: 0,
        brave: 0,
      };

  switch (body.reaction) {
    case "😂 Funny":
      reactions.funny++;
      break;

    case "😢 Sad":
      reactions.sad++;
      break;

    case "😡 Crazy":
      reactions.crazy++;
      break;

    case "❤️ Brave":
      reactions.brave++;
      break;
  }

  await redis.set(
    key,
    JSON.stringify(reactions)
  );

  return c.json(reactions);
});

// Number of community whispers
whispers.get("/count", async (c) => {
  const saved = await redis.get("community_whispers");

  const community = saved
    ? JSON.parse(saved)
    : [];

  return c.json({
    count: community.length,
  });
});
