export function fn(input: string, markerLength: number) {
  let regexStr = "";

  for (let i = 0; i <= markerLength - 2; ++i) {
    const lookAhead = markerLength - (i + 2);
    const captureGroup = i + 1;
    regexStr += `(.)(?!(?:.{0,${lookAhead}})\\${captureGroup})`;
  }

  const regex = new RegExp(regexStr);

  const result = regex.exec(input)!;

  return result.index + markerLength;
}

export function fnBetter(input: string, markerLength: number) {
  for (let i = 0; i < input.length; ++i) {
    const window = new Set<string>();

    for (let w = i; w < i + markerLength; ++w) {
      window.add(input[w]);
    }

    if (window.size === markerLength) {
      return i + markerLength;
    }
  }
}
