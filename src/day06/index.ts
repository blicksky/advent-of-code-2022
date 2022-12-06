export function findMarkerPositionWithRegExps(
  input: string,
  markerLength: number
) {
  let pattern = "";

  for (let i = 0; i <= markerLength - 2; ++i) {
    const lookAhead = markerLength - (i + 2);
    const captureGroup = i + 1;
    pattern += `(.)(?!(?:.{0,${lookAhead}})\\${captureGroup})`;
  }

  const results = new RegExp(pattern).exec(input)!;
  return results.index + markerLength;
}

export function findMarkerPositionWithSets(
  input: string,
  markerLength: number
) {
  for (let position = 0; position < input.length; ++position) {
    const markerEndPosition = position + markerLength;
    const markerCharacters = new Set<string>();

    for (
      let markerPosition = position;
      markerPosition < markerEndPosition;
      ++markerPosition
    ) {
      markerCharacters.add(input[markerPosition]);
    }

    if (markerCharacters.size === markerLength) {
      return markerEndPosition;
    }
  }
}
