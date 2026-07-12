import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    // Background
    this.add.image(512, 384, "background");

    // Loading bar outline
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    // Progress bar
    const bar = this.add.rectangle(
      512 - 230,
      384,
      4,
      28,
      0xffffff
    );

    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    // Assets
    this.load.setPath("../assets");
 
    this.load.image("logo", "logo.png");
 
    this.load.audio("correct", "audio/correct.mp3");
    this.load.audio("gameover", "audio/gameover.mp3");
    this.load.audio("achievement", "audio/achievement.mp3");
    // =========================
    // SOUND EFFECTS
    // =========================
    this.load.audio("click", "audio/click.mp3");
    this.load.audio("correct", "audio/correct.mp3");
    this.load.audio("gameover", "audio/gameover.mp3");
    this.load.audio("achievement", "audio/achievement.mp3");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
