import { TextStyle, Platform } from "react-native";
import * as Colors from "./colors";

type FontSize = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70";
export const fontSize: Record<FontSize, TextStyle> = {
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
};

type LineHeight = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70";
export const lineHeight: Record<LineHeight, TextStyle> = {
  x10: {
    lineHeight: 20,
  },
  x20: {
    lineHeight: 22,
  },
  x30: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 26,
  },
  x50: {
    lineHeight: 32,
  },
  x60: {
    lineHeight: 38,
  },
  x70: {
    lineHeight: 44,
  },
};

type FontWeight = "regular" | "medium" | "semibold";
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    fontFamily: "Inter_400Regular",
  },
  medium: {
    fontFamily: "Inter_500Medium",
  },
  semibold: {
    fontFamily: "Inter_600SemiBold",
  },
};

type Header = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70";
export const header: Record<Header, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.semibold,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.semibold,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.semibold,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.semibold,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.semibold,
  },
  x60: {
    ...fontSize.x60,
    ...lineHeight.x60,
    ...fontWeight.semibold,
  },
  x70: {
    ...fontSize.x70,
    ...lineHeight.x70,
    ...fontWeight.semibold,
  },
};

type Subheader = "x10" | "x20" | "x30" | "x40" | "x50";
export const subheader: Record<Subheader, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.medium,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.medium,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.medium,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.medium,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.medium,
  },
};

type Body = "x10" | "x20" | "x30" | "x40" | "x50";
export const body: Record<Body, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.regular,
    color: Colors.neutral.s800,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.regular,
    color: Colors.neutral.s800,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.regular,
    color: Colors.neutral.s800,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.regular,
    color: Colors.neutral.s800,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.regular,
    color: Colors.neutral.s800,
  },
};
