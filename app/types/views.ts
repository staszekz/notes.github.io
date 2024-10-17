export const viewTypes = {
  TABLE: 'TABLE',
  GRID: 'GRID',
  STICKERS: 'STICKERS',
} as const


export type ViewType = typeof viewTypes[keyof typeof viewTypes]