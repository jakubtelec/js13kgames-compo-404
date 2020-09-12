const LEVELS_MAP = [
  {
    // OK
    // intro - moving, pushing
    map: [
      "rrr______",
      "rpr_rrrr_",
      "r___r____",
      "rrr_rbrrr",
      "____r____",
      "_rrrd__e_",
      "____drrrr",
    ],
  },
  {
    // OK
    // intro - swapping
    map: [
      "rrrrrrrr",
      "r______r",
      "r_p____r",
      "r_____br",
      "r___rc_r",
      "rrrrrrrr",
      "______d_",
      "____e___",
      "________",
    ],
    code: ["="],
  },
  {
    // OK
    // intro- double player
    map: [
      "__ddd___dd",
      "_p________",
      "____ddd___",
      "dddddddddd",
      "rrrrrrrrrr",
      "__________",
      "_pd___d_de",
      "____ddd___",
    ],
  },
  {
    // multiplayers generation - change object into yourself
    // quite hard
    map: [
      "__________",
      "_p_rc_b___",
      "__________",
      "rrrrrrbrrr",
      "rrrrrrbrrr",
      "rrrrrrbrrr",
      "__________",
      "_______e__",
    ],
    code: ["="],
  },
  {
    // three players
    // quite hard
    map: [
      "d___r____",
      "d_p_r__p_",
      "d___r____",
      "d_rrrrrbr",
      "d_r_____d",
      "d___rdr_d",
      "dr_rrerpd",
      "dr_r__b__",
    ],
    code: ["="],
  },
  {
    // multiplayers generation - change object into yourself
    // remix - very hard
    map: [
      "__________",
      "_p_rc_b___",
      "__________",
      "rrrrrrbrrr",
      "rrrrrr_rrr",
      "rrrrrr_rrr",
      "dddddd_ddd",
      "_______e__",
    ],
    code: ["="],
  },
];

export default LEVELS_MAP;
