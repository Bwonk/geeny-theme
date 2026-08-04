import type { ObjectFit } from "../global-types";

const DEFAULT_OBJECT_FIT: ObjectFit = "Cover";

const OBJECT_FIT_MAP: Record<ObjectFit, string> = {
  Fill: "fill",
  Cover: "cover",
  Contain: "contain",
};

/** Maps ikas ObjectFit ENUM → CSS object-fit value. */
export function resolveObjectFit(value?: ObjectFit): string {
  return OBJECT_FIT_MAP[value ?? DEFAULT_OBJECT_FIT];
}
