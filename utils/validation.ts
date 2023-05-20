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
  error: z.object({
    username: z.string(),
    password: z.string(),
  }),
});
export type AuthError = z.infer<typeof authErrorSchema>;

const beatmapSchema = z.object({
  highestCombo: z.number(),
  _id: z.string(),
  code: z.string(),
});
export const userSchema = z.object({
  message: z.object({
    username: z.string(),
    beatmap: z.object({
      easy: z.array(beatmapSchema),
      normal: z.array(beatmapSchema),
      hard: z.array(beatmapSchema),
    }),
  }),
});
export type User = z.infer<typeof userSchema>;
