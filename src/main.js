import Phaser from "phaser";
import Game from "./game/game";
import SceneMainMenu from "./game/scenes/mainmenu";
import SceneLevel from "./game/scenes/level";

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  parent: "game",
  scene: [SceneMainMenu, SceneLevel],
};

window.addEventListener("load", () => {
  new Game(config);
});
