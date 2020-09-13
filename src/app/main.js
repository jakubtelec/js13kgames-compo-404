import Scene from "./scene";
import LEVELS_MAP from "./constants/levels";
import SCREENS from "./constants/screens";

const game = new Scene(LEVELS_MAP, SCREENS);

game.run();
