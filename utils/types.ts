import * as PIXI from "pixi.js";
import { z } from "zod";
import { timings } from "~/assets/tap-sfx/tapSFX";

export type Toast = z.infer<typeof toastSchema>;
export type UserCredentials = z.infer<typeof userCredentialsSchema>;
export type AuthError = z.infer<typeof authErrorSchema>;
export type User = z.infer<typeof userSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Combo = z.infer<typeof comboSchema>;
export type Beatmap = z.infer<typeof beatmapSchema>;
export type Beatmaps = z.infer<typeof beatmapsSchema>;
export type ScoreData = z.infer<typeof scoreDataSchema>;

export interface ExtendedNoteType extends Note {
  sprite: PIXI.Sprite;
}

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;
export type ZeroToEight = IntRange<0, 8>;
export type OneToNine = IntRange<1, 9>;
export type Timings = (typeof timings)[keyof typeof timings] | "";
export interface PositionProps {
  num: ZeroToEight;
  xOrigin: number;
  yOrigin: number;
  mainRadius: number;
}
export interface SpriteProps {
  x: number;
  y: number;
}
export interface ActiveNoteProps {
  mainRadius: number;
  xOrigin: number;
  yOrigin: number;
}
export type Stats = Record<Timings, number>;
export interface ScorePayload {
  beatmap_id: string;
  highest_combo: number;
}
