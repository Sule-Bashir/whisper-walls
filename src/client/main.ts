import { AUTO, Game as PhaserGame } from "phaser";

import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { SubmitWhisper } from "./scenes/SubmitWhisper";
import { Leaderboard } from "./scenes/Leaderboard";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,

  parent: "game-container",

  backgroundColor: "#111827",

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 1280,
  },

  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver,
    SubmitWhisper,
    Leaderboard,
  ],
};

export default new PhaserGame(config);
