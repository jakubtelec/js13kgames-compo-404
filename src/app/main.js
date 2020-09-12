import Scene from "./scene";
import LEVELS_MAP from "./constants/levels";
import { GAME_OVER, WON } from "./constants/screens";

const game = new Scene(LEVELS_MAP, { GAME_OVER, WON, LEVELS_MAP });

game.run();
