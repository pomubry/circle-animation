import * as PIXI from "pixi.js";
import type {
  ActiveNoteProps,
  ExtendedNoteType,
  Note,
  OneToNine,
  PositionProps,
  SpriteProps,
  Stats,
  ZeroToEight,
} from "./types";

export const digitKeys: Record<string, OneToNine> = {
  Digit1: 1,
  Digit2: 2,
  Digit3: 3,
  Digit4: 4,
  Digit5: 5,
  Digit6: 6,
  Digit7: 7,
  Digit8: 8,
  Digit9: 9,
} as const;

const angles = {} as Record<ZeroToEight, number>;
for (let i = 0; i < 9; i++) {
  angles[i as ZeroToEight] = 22.5 * i * (Math.PI / 180);
}

export const createNoteCanvas = (
  rad1: number,
  rad2: number,
  attribute: number
) => {
  const canvas = document.createElement("canvas");
  canvas.width = rad2 * 2;
  canvas.height = rad2 * 2;
  const color =
    attribute === 1 ? "pink" : attribute === 2 ? "lightgreen" : "skyblue";

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      rad2,
      rad2,
      rad1,
      rad2,
      rad2,
      rad2
    );
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.9, color);
    ctx.fillStyle = gradient;
    ctx.arc(rad2, rad2, rad2, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  return canvas;
};

export const createNoteSprite = (
  props: SpriteProps,
  noteTexture: PIXI.Texture<PIXI.Resource>
) => {
  const sprite = PIXI.Sprite.from(noteTexture);
  sprite.eventMode = "none";
  sprite.anchor.set(0.5);
  sprite.x = props.x;
  sprite.y = props.y;
  return sprite;
};

export const generateActiveNote = (
  note: Note,
  { mainRadius, xOrigin, yOrigin }: ActiveNoteProps,
  noteTexture: PIXI.Texture<PIXI.Resource>
) => {
  const position = getNotePosition({
    num: (note.position - 1) as ZeroToEight,
    mainRadius,
    xOrigin,
    yOrigin,
  });
  const sprite = createNoteSprite(position, noteTexture);
  const activeNote: ExtendedNoteType = {
    ...note,
    sprite,
  };
  return activeNote;
};

export const labelStyle = new PIXI.TextStyle({
  fontWeight: "bold",
  fill: "white",
});

export const getNotePosition = (props: PositionProps) => {
  const angle = angles[props.num];
  const y = props.yOrigin + props.mainRadius * Math.sin(angle);
  const x = props.xOrigin - props.mainRadius * Math.cos(angle);
  return { x, y };
};

export const defaultStats: Stats = {
  PERFECT: 0,
  GREAT: 0,
  GOOD: 0,
  BAD: 0,
  EARLY: 0,
  LATE: 0,
  "": 0, // ignore
};
