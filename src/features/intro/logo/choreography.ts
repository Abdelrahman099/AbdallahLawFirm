import type { LogoIntroId } from "./variants";

type Choreography = {
  angles: readonly number[];
  contact: number;
  lock: number;
  quillStart: number;
  quillFrom: number;
  captionAt: number;
};

export const logoChoreography: Record<LogoIntroId, Choreography> = {
  "logo-balance": {
    angles: [-18, 14, -11, 8, -5, 2],
    contact: 2.1,
    lock: 0.2,
    quillStart: 1.32,
    quillFrom: -380,
    captionAt: 2.4,
  },
  "logo-ink": {
    angles: [12, -15, 11, -8, 4, -2],
    contact: 2.05,
    lock: 0.2,
    quillStart: 1.15,
    quillFrom: -330,
    captionAt: 2.35,
  },
  "logo-assembly": {
    angles: [-20, 16, -12, 9, -5, 2],
    contact: 2.15,
    lock: 0.18,
    quillStart: 1.12,
    quillFrom: -400,
    captionAt: 2.45,
  },
  "logo-book": {
    angles: [15, -12, 9, -6, 4, -2],
    contact: 2.2,
    lock: 0.24,
    quillStart: 1,
    quillFrom: -460,
    captionAt: 2.55,
  },
  "logo-seal": {
    angles: [22, -18, 13, -9, 5, -2],
    contact: 2.08,
    lock: 0.15,
    quillStart: 1.5,
    quillFrom: -410,
    captionAt: 2.45,
  },
};
