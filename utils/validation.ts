import { z } from "zod";

export const toastSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.union([z.literal("SUCCESS"), z.literal("ERROR")]),
});

export const userCredentialsSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(6),
});

export const authErrorSchema = z.object({
  message: z.string(),
  details: z.object({
    username: z.object({ __errors: z.array(z.string()) }).optional(),
    password: z.object({ __errors: z.array(z.string()) }).optional(),
  }),
});

export const scoreDataSchema = z.object({
  beatmap_id: z.string(),
  highest_combo: z.coerce.number().min(1).max(2000).int(),
});

export const userSchema = z.object({
  username: z.string(),
  notes: z.array(scoreDataSchema),
});

export const noteSchema = z.object({
  note_id: z.string(),
  timing_sec: z.coerce.number().min(0),
  position: z.coerce.number().int().min(1).max(9),
});

export const comboSchema = z.object({
  combo_id: z.string(),
  combo: z.coerce.number().int().min(1),
  combo_min: z.coerce.number().int().min(0),
  combo_max: z.coerce.number().int().min(0),
});

export const beatmapSchema = z.object({
  beatmap_id: z.string(),
  code: z.string().max(10),
  song_name: z.string().max(100),
  difficulty: z.coerce.number().int().min(1),
  notes_attribute: z.coerce.number().int().min(1).max(3),
  member_category: z.coerce.number().int().min(1),
  notes: z.array(noteSchema),
  combos: z.array(comboSchema),
});

export const beatmapsSchema = z.array(beatmapSchema);
