import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }
   
  private async submitScore(score: number) {
  try {
    const username =
      localStorage.getItem("whisper_username") ?? "Anonymous";

    await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        score,
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
  create(data: { score?: number }) {
    this.cameras.main.setBackgroundColor("#111827");

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const score = data.score ?? 0;
    this.submitScore(score);
    this.add
      .text(centerX, centerY - 170, "🧱 Whisper Walls", {
        fontSize: "34px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 110, "🎉 Game Over!", {
        fontSize: "30px",
        color: "#22c55e",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 40, `⭐ Final Score: ${score}/10`, {
        fontSize: "28px",
        color: "#facc15",
      })
      .setOrigin(0.5);

    let message = "Good effort!";

    if (score === 10) {
      message = "🏆 Perfect! You're a Whisper Master!";
    } else if (score >= 8) {
      message = "🔥 Amazing! Come back tomorrow!";
    } else if (score >= 5) {
      message = "👏 Nice job! Can you score higher?";
    }
    let dailyReward = "";

if (score >= 8) {
  dailyReward =
    "🏅 Daily Challenge Completed!\nCome back tomorrow for a new challenge.";
} else {
  dailyReward =
    "🎯 Daily Challenge Failed\nScore 8/10 or higher to earn today's badge.";
}
    this.add
      .text(centerX, centerY + 20, message, {
        fontSize: "22px",
        color: "#60a5fa",
        align: "center",
      })
      .setOrigin(0.5);
    this.add
  .text(centerX, centerY + 70, dailyReward, {
    fontSize: "20px",
    color: "#22c55e",
    align: "center",
  })
  .setOrigin(0.5);

    // Play Again
    const playAgain = this.add
      .text(centerX, centerY + 130, "▶ Play Again", {
        fontSize: "26px",
        color: "#ffffff",
        backgroundColor: "#2563eb",
        padding: {
          left: 22,
          right: 22,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playAgain.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });

    // Submit Whisper
    const submitButton = this.add
      .text(centerX, centerY + 190, "✍ Submit a Whisper", {
        fontSize: "26px",
        color: "#ffffff",
        backgroundColor: "#16a34a",
        padding: {
          left: 22,
          right: 22,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    submitButton.on("pointerdown", () => {
      this.scene.start("SubmitWhisper");
    });

    // Main Menu
    const menuButton = this.add
      .text(centerX, centerY + 250, "🏠 Main Menu", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#6b7280",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    menuButton.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
