import z from 'zod';

export const settingsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url()
});

export type SettingsInitialState = {
  name: boolean;
  email: boolean;
  avatar: boolean;
};
export type SettingsValues = z.infer<typeof settingsSchema>;

export type SettingsAction = { type: 'TOGGLE_EDIT'; field: string };
