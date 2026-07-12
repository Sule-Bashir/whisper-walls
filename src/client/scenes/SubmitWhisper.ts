import { Scene } from "phaser";

export class SubmitWhisper extends Scene {
  constructor() {
    super("SubmitWhisper");
  }

  create() {
    this.cameras.main.setBackgroundColor("#111827");

    const centerX = this.scale.width / 2;

    this.add
      .text(centerX, 60, "✍ Submit a Whisper", {
        fontSize: "34px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(
        centerX,
        125,
        "Thanks for playing Whisper Walls!",
        {
          fontSize: "24px",
          color: "#22c55e",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        centerX,
        250,
        "To keep every confession anonymous,\nWhisper Walls uses Reddit's secure\nsubmission form.\n\nOpen the subreddit menu and tap\n'Example Form' to submit your whisper.\n\nAfter submitting, your whisper becomes\npart of the Community Whisper pool\nfor everyone to discover.",
        {
          fontSize: "22px",
          color: "#d1d5db",
          align: "center",
          wordWrap: {
            width: 700,
          },
        }
      )
      .setOrigin(0.5);

    // =========================
    // PLAY AGAIN
    // =========================

    const playAgain = this.add
      .text(centerX, 560, "▶ Play Again", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#2563eb",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playAgain.on("pointerdown", () => {
      this.sound.play("click");

      this.tweens.add({
        targets: playAgain,
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

    // =========================
    // MAIN MENU
    // =========================

    const backButton = this.add
      .text(centerX, 630, "🏠 Main Menu", {
        fontSize: "22px",
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
