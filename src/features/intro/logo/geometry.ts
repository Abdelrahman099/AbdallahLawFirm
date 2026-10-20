import source from "../../../../brand/v4/logos/mark-primary.svg?raw";

const outline = source.match(/<path[^>]*\sd="([^"]+)"/)?.[1];
const transform = source.match(/<g transform="([^"]+)"/)?.[1];
const parts = outline?.split(/\s+(?=M\s)/);
if (!transform || !parts || parts.length !== 5) {
  throw new Error("The intro requires the approved v4 emblem's five contours.");
}

export const logoGeometry = {
  transform,
  frame: parts[0],
  quill: parts[1],
  detail: parts[2],
  book: parts[3],
  foot: parts[4],
};
