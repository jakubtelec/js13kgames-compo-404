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
    // intro- double player - something little bit harder
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
    // OK
    map: ["__b___b___", "_bbb_bbb__", "_bpb_bpbe_", "_bbb_bbb__", "__b___br__"],
    code: ["="],
  },
  {
    // multiplayers generation - change object into yourself
    // quite hard
    map: [
      "__________",
      "___rc_b__p",
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
    // multiplayers generation - change object into yourself remix
    // harder
    map: [
      "__________",
      "___rc_b__p",
      "__________",
      "rrrrrrbrrr",
      "rrrrrrbrrr",
      "rrrrrrbrrr",
      "rrrrrrbrrr",
      "__________",
      "_______e__",
    ],
    code: ["="],
  },
  {
    // OK
    // multipleplayer - pretty hard
    map: [
      "____b_b___p",
      "_r_rbrbr_r_",
      "bbbbbbbbbbb",
      "_r_rbrbr_r_",
      "d_bbbebbb_d",
      "_r_rbrbr_r_",
      "bbbbbbbbbbb",
      "_r_rbrbr_r_",
      "p___b_b____",
    ],
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
    // OK
    // multipleplayer - pretty hard
    map: [
      "d_pd_d_d__d",
      "________p__",
      "_d_e_d_e_d_",
      "___________",
      "_d_d_d_d_d_",
      "___________",
      "_d_e_d_e_d_",
      "__p________",
      "d__d_d_dp_d",
    ],
  },
  {
    // OK
    // big square - one pattern to solve
    map: [
      "_____p_r_____",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbrbbbb_",
      "_bbbbbebbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_bbbbbbbbbbb_",
      "_______r_____",
    ],
  },
  {
    // OK
    // big square - one pattern to solve
    map: [
      "_____p_____",
      "_bbbbbbbbb_",
      "_bbbbbbbbb_",
      "_bbbbbbbbb_",
      "_bbbbrbbbb_",
      "_bbbe_bbbb_",
      "_bbrbbbbbb_",
      "_bbbbbbbbb_",
      "_bbbbbbbbb_",
      "_bbbbbbbbb_",
      "___________",
    ],
  },
];

export default LEVELS_MAP;
