type Left = "<";
type Right = ">";
type GasJetDirection = Left | Right;

export function main() {}

export function* getGasJetSequence(pattern: string): Iterator<GasJetDirection> {
  for (let i = 0; true; i = (i + 1) % pattern.length) {
    yield pattern[i] as GasJetDirection;
  }
}
