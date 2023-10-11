type Layout =
  | "x10"
  | "x20"
  | "x30"
  | "x40"
  | "x50"
  | "x60"
  | "x70"
  | "x80"
  | "x90";

export const layout: Record<Layout, number> = {
  x10: 4,
  x20: 8,
  x30: 12,
  x40: 16,
  x50: 20,
  x60: 24,
  x70: 28,
  x80: 32,
  x90: 36,
};

export const x10 = layout.x10;
export const x20 = layout.x20;
export const x30 = layout.x30;
export const x40 = layout.x40;
export const x50 = layout.x50;
export const x60 = layout.x60;
export const x70 = layout.x70;
export const x80 = layout.x80;
export const x90 = layout.x90;
