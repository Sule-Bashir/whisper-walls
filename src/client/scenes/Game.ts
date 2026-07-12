import { Scene } from "phaser";

export class Game extends Scene {
  private whisperText!: Phaser.GameObjects.Text;
  private result!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private roundText!: Phaser.GameObjects.Text;
  private progressBar!: Phaser.GameObjects.Graphics;
  private communityText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private buttons: Phaser.GameObjects.Text[] = [];
  private achievementText!: Phaser.GameObjects.Text;
  private challengeText!: Phaser.GameObjects.Text;
  private correctSound!: Phaser.Sound.BaseSound;
  private gameOverSound!: Phaser.Sound.BaseSound;
  private achievementSound!: Phaser.Sound.BaseSound;
  private score = 0;
  private round = 1;
  private readonly maxRounds = 10;
  private answered = false;

  constructor() {
    super("Game");
  }

  create() {
    this.score = 0;
    this.round = 1;
    this.answered = false;
    this.buttons = [];
    
    this.loadPlayer();

    this.cameras.main.setBackgroundColor("#111827");
    this.correctSound = this.sound.add("correct");
    this.gameOverSound = this.sound.add("gameover");
    this.achievementSound = this.sound.add("achievement");
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // Title
    this.add
      .text(centerX, 45, "🧱 Whisper Walls", {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Score
    this.scoreText = this.add
      .text(120, 90, "⭐ 0", {
        fontSize: "22px",
        color: "#facc15",
      })
      .setOrigin(0.5);

    // Round
    this.roundText = this.add
      .text(this.scale.width - 120, 90, "Round 1/10", {
        fontSize: "22px",
        color: "#60a5fa",
      })
      .setOrigin(0.5);

    // Progress Bar
    this.progressBar = this.add.graphics();
    this.drawProgress();

    // Subtitle
    this.add
      .text(centerX, 140, "Anonymous Whisper", {
        fontSize: "20px",
        color: "#9ca3af",
      })
      .setOrigin(0.5);

    // Community Count
    this.communityText = this.add
      .text(centerX, 170, "🌍 Community Whispers: Loading...", {
        fontSize: "18px",
        color: "#22c55e",
      })
      .setOrigin(0.5);

    this.loadCommunityCount();
    this.streakText = this.add
  .text(centerX, 185, "🔥 Daily Streak: Loading...", {
    fontSize: "18px",
    color: "#fb923c",
  })
  .setOrigin(0.5);

this.loadDailyStreak();
this.achievementText = this.add
  .text(centerX, 205, "🏆 Achievement: Loading...", {
    fontSize: "18px",
    color: "#60a5fa",
  })
  .setOrigin(0.5);

this.loadAchievements();
    this.challengeText = this.add
  .text(
    centerX,
    245,
    "🎯 Daily Challenge: Loading...",
    {
      fontSize: "18px",
      color: "#facc15",
      align: "center",
    }
  )
  .setOrigin(0.5);

this.loadDailyChallenge();
    // Whisper
    this.whisperText = this.add
      .text(centerX, centerY + 20, "", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
        wordWrap: {
          width: this.scale.width - 80,
        },
      })
      .setOrigin(0.5);

    const reactions = [
      "😂 Funny",
      "😢 Sad",
      "😡 Crazy",
      "❤️ Brave",
    ];

    reactions.forEach((label, index) => {
      const button = this.add
        .text(
          centerX,                       
          centerY + 90 + index * 55,
          label.padEnd(10, " "),
          {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#6b7280",
            padding: {
              left: 20,
              right: 20,
              top: 10,
              bottom: 10,
            },
          }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      button.on("pointerdown", () => {
        this.selectReaction(button, label);
      });

      this.buttons.push(button);
    });
    this.result = this.add
     .text(centerX, centerY + 285, "👇 Tap one reaction", {
      fontSize: "22px",
      color: "#facc15",
      align: "center",
      })
      .setOrigin(0.5);

    this.showRandomWhisper();
  }

  private async loadCommunityCount() {
    try {
      const res = await fetch("/api/whispers/count");
      const data = await res.json();

      this.communityText.setText(
        `🌍 Community Whispers: ${data.count}`
      );
    } catch {
      this.communityText.setText(
        "🌍 Community Whispers: --"
      );
    }
  }
  private async loadPlayer() {
  // Already have a saved name?
  const savedName =
    localStorage.getItem("whisper_username");

  if (savedName) {
    return;
  }

  try {
    const res = await fetch("/api/init");
    const data = await res.json();

    console.log("INIT RESPONSE:", data);

    if (
      data.username &&
      data.username !== "anonymous"
    ) {
      localStorage.setItem(
        "whisper_username",
        data.username
      );
    } else {
      const fallback =
        `Player-${Math.floor(Math.random() * 10000)}`;

      localStorage.setItem(
        "whisper_username",
        fallback
      );
    }
  } catch (err) {
    console.error("INIT ERROR:", err);

    const fallback =
      `Player-${Math.floor(Math.random() * 10000)}`;

    localStorage.setItem(
      "whisper_username",
      fallback
    );
  }
}
  private async loadDailyStreak() {
  try {
    const res = await fetch("/api/streak");
    const data = await res.json();

    this.streakText.setText(
      `🔥 Daily Streak: ${data.streak} day${data.streak === 1 ? "" : "s"}`
    );
  } catch {
    this.streakText.setText(
      "🔥 Daily Streak: --"
    );
  }
}
  private async loadDailyChallenge() {
  try {
    const res = await fetch("/api/streak");

    const data = await res.json();

    this.challengeText.setText(
      `🎯 Daily Challenge: ${data.challenge}`
    );
  } catch {
    this.challengeText.setText(
      "🎯 Daily Challenge unavailable"
    );
  }
}
  private async loadAchievements() {
  try {
    const res = await fetch("/api/achievements");
    const data = await res.json();

    this.achievementText.setText(
      `${data.badge} ${data.title}`
    );
  } catch {
    this.achievementText.setText(
      "🌱 New Player"
    );
  }
}  
 
  private async saveGameStats() {
  try {
    await fetch("/api/stats/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: this.score,
      }),
    });
  } catch {}
}

  private async showRandomWhisper() {
    this.answered = false;

    try {
      const res = await fetch("/api/whispers/random");
      const data = await res.json();

      this.whisperText.setAlpha(0);
      this.whisperText.setText(`"${data.whisper}"`);

      this.tweens.add({
        targets: this.whisperText,
        alpha: 1,
        duration: 300,
      });
    } catch {
      this.whisperText.setText(
        '"Unable to load whisper."'
      );
    }

    this.buttons.forEach((btn) => {
      btn.setStyle({
        backgroundColor: "#6b7280",
      });
    });

    this.result.setText("👇 Tap one reaction");
  }

  private selectReaction(
    button: Phaser.GameObjects.Text,
    label: string
  ) {
    if (this.answered) return;

    this.answered = true;

    this.buttons.forEach((btn) => {
      btn.setStyle({
        backgroundColor: "#6b7280",
      });
    });

    button.setStyle({
      backgroundColor: "#16a34a",
    });

    this.score++;

    this.correctSound.play();
    this.scoreText.setText(`⭐ ${this.score}`);
    
    fetch("/api/stats/reaction", {
      method: "POST",
    }).catch(() => {});

    this.result.setText(`✅ You selected: ${label}`);   
if (this.round >= this.maxRounds) {
  this.saveGameStats();

  this.loadAchievements();

  if (this.score >= 8) {
    this.achievementSound.play();

    this.time.delayedCall(1200, () => {
      this.gameOverSound.play();
    
      this.time.delayedCall(500, () => {
        this.scene.start("GameOver", {
          score: this.score,
        });
      });
    });
  } else {
    this.gameOverSound.play();

    this.time.delayedCall(500, () => {
      this.scene.start("GameOver", {
        score: this.score,
      });
    });
  }

  return;
}

    this.round++;

    this.roundText.setText(
      `Round ${this.round}/${this.maxRounds}`
    );

    this.drawProgress();

    this.time.delayedCall(1000, () => {
      this.showRandomWhisper();
    });
  }

  private drawProgress() {
    const width = 300;
    const height = 12;

    const x = (this.scale.width - width) / 2;
    const y = 100;

    this.progressBar.clear();

    this.progressBar.fillStyle(0x374151);

    this.progressBar.fillRoundedRect(
      x,
      y,
      width,
      height,
      6
    );

    this.progressBar.fillStyle(0x22c55e);

    this.progressBar.fillRoundedRect(
      x,
      y,
      (width * this.round) / this.maxRounds,
      height,
      6
    );
  }
}
