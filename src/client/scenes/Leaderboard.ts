import { Scene } from "phaser";

export class Leaderboard extends Scene {
  constructor() {
    super("Leaderboard");
  }

  async create() {
    this.cameras.main.setBackgroundColor("#111827");

    const centerX = this.scale.width / 2;

    // =========================
    // TITLE
    // =========================
    this.add
      .text(centerX, 50, "🏆 Top Players", {
        fontSize: "34px",
        color: "#facc15",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 85, "Beat today's best score!", {
        fontSize: "18px",
        color: "#9ca3af",
      })
      .setOrigin(0.5);

    const loadingText = this.add
      .text(centerX, 120, "Loading leaderboard...", {
        fontSize: "18px",
        color: "#9ca3af",
      })
      .setOrigin(0.5);

    try {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();

      loadingText.destroy();

      const scores = data.leaderboard ?? [];

      const currentUser =
        localStorage.getItem("whisper_username") ??
        "Anonymous";

      if (scores.length === 0) {
        this.add
          .text(
            centerX,
            250,
            "🏆 Nobody has conquered\nWhisper Walls yet!\n\nBe the first champion!",
            {
              fontSize: "22px",
              color: "#facc15",
              align: "center",
            }
          )
          .setOrigin(0.5);
      } else {
        scores.forEach(
          (
            player: {
              username: string;
              score: number;
            },
            index: number
          ) => {
            let medal = "";

            if (index === 0) medal = "🥇";
            else if (index === 1) medal = "🥈";
            else if (index === 2) medal = "🥉";
            else medal = `${index + 1}.`;

            const isCurrentPlayer =
              player.username === currentUser;

            let username = player.username;

            if (username.length > 18) {
              username =
                username.substring(0, 15) + "...";
            }

            // Card background
            this.add.rectangle(
              centerX,
              160 + index * 34,
              600,
              32,
              isCurrentPlayer
                ? 0x14532d
                : 0x1f2937
            );

            this.add
              .text(
                centerX,
                160 + index * 34,
                `${medal} ${username}  ${player.score}/10${
                  isCurrentPlayer ? "  ⭐ YOU" : ""
                }`,
                {
                  fontSize: "20px",
                  color: isCurrentPlayer
                    ? "#facc15"
                    : "#ffffff",
                  fontStyle: isCurrentPlayer
                    ? "bold"
                    : "normal",
                }
              )
              .setOrigin(0.5);
          }
        );
      }
    } catch {
      loadingText.destroy();

      this.add
        .text(
          centerX,
          240,
          "❌ Unable to load leaderboard",
          {
            fontSize: "24px",
            color: "#ef4444",
          }
        )
        .setOrigin(0.5);
    }

    // =========================
    // REFRESH
    // =========================

    const refreshButton = this.add
      .text(centerX, 500, "🔄 Refresh Rankings", {
        fontSize: "22px",
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

    refreshButton.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: refreshButton,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
        ease: "Quad.easeOut",
        onComplete: () => {
          this.scene.restart();
        },
      });
    });

    // =========================
    // MAIN MENU
    // =========================

    const backButton = this.add
      .text(centerX, 555, "🏠 Main Menu", {
        fontSize: "22px",
        color: "#ffffff",
        backgroundColor: "#2563eb",
        padding: {
          left: 24,
          right: 24,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: backButton,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
        ease: "Quad.easeOut",
        onComplete: () => {
          this.scene.start("MainMenu");
        },
      });
    });
  }
}
