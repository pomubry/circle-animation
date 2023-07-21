import { z } from "zod";

export const toastSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.union([z.literal("SUCCESS"), z.literal("ERROR")]),
});
export type Toast = z.infer<typeof toastSchema>;

export const userCredentialsSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});
export type UserCredentials = z.infer<typeof userCredentialsSchema>;

export const authErrorSchema = z.object({
  message: z.string(),
  details: z.object({
    username: z.object({ __errors: z.array(z.string()) }).optional(),
    password: z.object({ __errors: z.array(z.string()) }).optional(),
  }),
});
export type AuthError = z.infer<typeof authErrorSchema>;

export const userSchema = z.object({
  username: z.string(),
  notes: z.array(
    z.object({
      beatmap_id: z.string(),
      highest_combo: z.coerce.number(),
    })
  ),
});
export type User = z.infer<typeof userSchema>;

const noteSchema = z.object({
  note_id: z.string(),
  timing_sec: z.coerce.number(),
  position: z.coerce.number().min(1).max(9),
});
export type Note = z.infer<typeof noteSchema>;

const comboSchema = z.object({
  combo_id: z.string(),
  combo: z.coerce.number().int().min(1),
  combo_min: z.coerce.number().int().min(0),
  combo_max: z.coerce.number().int().min(0),
});
export type Combo = z.infer<typeof comboSchema>;

const beatmapSchema = z.object({
  beatmap_id: z.string(),
  code: z.string(),
  song_name: z.string(),
  difficulty: z.coerce.number(),
  notes_attribute: z.coerce.number().min(1).max(3),
  member_category: z.coerce.number(),
  notes: z.array(noteSchema),
  combos: z.array(comboSchema),
});
export type Beatmap = z.infer<typeof beatmapSchema>;

export const beatmapsSchema = z.array(beatmapSchema);
export type Beatmaps = z.infer<typeof beatmapsSchema>;
