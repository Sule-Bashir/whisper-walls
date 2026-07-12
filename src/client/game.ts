import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { SubmitWhisper } from "./scenes/SubmitWhisper";
import { Leaderboard } from "./scenes/Leaderboard";
import * as Phaser from "phaser";
import { AUTO, Game } from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,

  parent: "game-container",

  backgroundColor: "#028af8",

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 768,
  },

  // Enable HTML DOM Elements
  dom: {
    createContainer: true,
  },

  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    GameOver,
    SubmitWhisper,
    Leaderboard,
  ],
};

const StartGame = (parent: string) => {
  return new Game({
    ...config,
    parent,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  StartGame("game-container");
});
