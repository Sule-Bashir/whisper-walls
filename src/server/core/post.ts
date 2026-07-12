import { reddit, context } from "@devvit/web/server";

export const createPost = async () => {
  console.log("context.subredditName =", context.subredditName);

  return await reddit.submitCustomPost({
    subredditName: context.subredditName,
    title: "Whisper Walls",
    entry: "default",
  });
};
