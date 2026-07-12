import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.cameras.main.setBackgroundColor("#111827");

    const centerX = this.scale.width / 2;

    // Title
    this.add
      .text(centerX, 55, "🧱 Whisper Walls", {
        fontSize: "36px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Subtitle
    this.add
      .text(centerX, 100, "Anonymous Confessions • Daily Challenge", {
        fontSize: "22px",
        color: "#9ca3af",
      })
      .setOrigin(0.5);

    // Daily Challenge
    this.add
      .text(
        centerX,
        135,
        "🎯 TODAY'S CHALLENGE\nScore 8/10 or higher to earn today's badge!",
        {
          fontSize: "18px",
          color: "#facc15",
          align: "center",
          backgroundColor: "#1f2937",
          padding: {
            left: 18,
            right: 18,
            top: 10,
            bottom: 10,
          },
        }
      )
      .setOrigin(0.5);

    // HOW TO PLAY
    this.add
      .text(
        centerX,
        205,
        "📖 HOW TO PLAY\n\n" +
          "• Read each whisper.\n" +
          "• Pick the best reaction.\n" +
          "• Complete all 10 rounds.\n" +
          "• Score 8/10+ for today's challenge.\n" +
          "• Return daily and climb the leaderboard!",
        {
          fontSize: "17px",
          color: "#d1d5db",
          align: "center",
          wordWrap: {
            width: 620,
          },
        }
      )
      .setOrigin(0.5);

    // PLAY
    const playButton = this.add
      .text(centerX, 300, "▶ Play", {
        fontSize: "28px",
        color: "#ffffff",
        backgroundColor: "#2563eb",
        padding: {
          left: 25,
          right: 25,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playButton.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: playButton,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
        ease: "Quad.easeOut",
        onComplete: () => {
          this.scene.start("Game");
        },
      });
    });

    // SUBMIT
    const submitButton = this.add
      .text(centerX, 375, "✍ Submit Whisper", {
        fontSize: "28px",
        color: "#ffffff",
        backgroundColor: "#16a34a",
        padding: {
          left: 25,
          right: 25,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    submitButton.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: submitButton,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
        ease: "Quad.easeOut",
        onComplete: () => {
          this.scene.start("SubmitWhisper");
        },
      });
    });

    // LEADERBOARD
    const leaderboardButton = this.add
      .text(centerX, 450, "🏆 Leaderboard", {
        fontSize: "28px",
        color: "#ffffff",
        backgroundColor: "#f59e0b",
        padding: {
          left: 25,
          right: 25,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    leaderboardButton.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: leaderboardButton,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
        ease: "Quad.easeOut",
        onComplete: () => {
          this.scene.start("Leaderboard");
        },
      });
    });

    // Footer
    this.add
      .text(
        centerX,
        545,
        "🔥 Play Daily\n🏆 Unlock Achievements • Beat the Leaderboard",
        {
          fontSize: "15px",
          color: "#facc15",
          align: "center",
        }
      )
      .setOrigin(0.5);
  }
}
