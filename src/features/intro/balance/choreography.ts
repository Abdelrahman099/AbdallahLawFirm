import type { BalanceIntroId } from "./variants";

export const choreography: Record<
  BalanceIntroId,
  {
    tilt: number;
    swordStart: number;
    swordDuration: number;
    scale: number;
    x: number;
    y: number;
    entryRotation: number;
  }
> = {
  "balance-onyx": {
    tilt: 18,
    swordStart: 0.75,
    swordDuration: 0.75,
    scale: 0.9,
    x: 0,
    y: 0,
    entryRotation: 0,
  },
  "balance-ivory": {
    tilt: -12,
    swordStart: 0.7,
    swordDuration: 0.6,
    scale: 1,
    x: -32,
    y: 0,
    entryRotation: 0,
  },
  "balance-seal": {
    tilt: 20,
    swordStart: 0.9,
    swordDuration: 0.6,
    scale: 0.65,
    x: 0,
    y: 0,
    entryRotation: -12,
  },
  "balance-split": {
    tilt: -26,
    swordStart: 0.85,
    swordDuration: 0.65,
    scale: 1,
    x: 35,
    y: 0,
    entryRotation: 0,
  },
  "balance-blueprint": {
    tilt: 14,
    swordStart: 0.9,
    swordDuration: 0.45,
    scale: 1.1,
    x: 0,
    y: -20,
    entryRotation: 0,
  },
  "balance-monolith": {
    tilt: 24,
    swordStart: 0.85,
    swordDuration: 0.7,
    scale: 0.65,
    x: 0,
    y: 42,
    entryRotation: 0,
  },
  "balance-ink": {
    tilt: 16,
    swordStart: 1.05,
    swordDuration: 0.65,
    scale: 1,
    x: 0,
    y: 0,
    entryRotation: 0,
  },
  "balance-portal": {
    tilt: -16,
    swordStart: 0.9,
    swordDuration: 0.5,
    scale: 0.85,
    x: 0,
    y: 35,
    entryRotation: 0,
  },
  "balance-orbit": {
    tilt: 22,
    swordStart: 0.85,
    swordDuration: 0.8,
    scale: 0.75,
    x: 0,
    y: 0,
    entryRotation: 12,
  },
  "balance-curtain": {
    tilt: 30,
    swordStart: 0.75,
    swordDuration: 0.75,
    scale: 1.15,
    x: 0,
    y: 0,
    entryRotation: 0,
  },
};
