// import { Timings } from "~/utils/game";
import PERFECT from "./SE_306.ogg";
import GREAT from "./SE_307.ogg";
import GOOD from "./SE_308.ogg";
import BAD from "./SE_309.ogg";
import LATE from "./SE_326.ogg";

export const timings = {
  PERFECT: "PERFECT",
  GREAT: "GREAT",
  GOOD: "GOOD",
  BAD: "BAD",
  EARLY: "EARLY",
  LATE: "LATE",
} as const;

export const tapSFX = {
  [timings.PERFECT]: PERFECT,
  [timings.GREAT]: GREAT,
  [timings.GOOD]: GOOD,
  [timings.BAD]: BAD,
  [timings.LATE]: LATE,
};
