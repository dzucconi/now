export const cons = <T>(inputArray: T[], size: number) => {
  return Array.from({ length: inputArray.length - (size - 1) }, (_, index) =>
    inputArray.slice(index, index + size)
  );
};

type Range = { min: number; max: number };

export const remap = (n: number, from: Range, to: Range) => {
  return ((n - from.min) * (to.max - to.min)) / (from.max - from.min) + to.min;
};

export const toNode = (html: string) => {
  return new DOMParser().parseFromString(html, "text/html").body
    .firstChild as HTMLElement;
};
