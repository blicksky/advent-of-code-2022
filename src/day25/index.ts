export function parseInput(input: string) {}

const snafuDigitValues: Record<string, number> = {
  "=": -2,
  "-": -1,
  "0": 0,
  "1": 1,
  "2": 2,
} as const;

export function fromSNAFU([...snafuNumber]: string): any {
  return snafuNumber.reduce((decimalNumber, snafuDigit, i) => {
    const placeValue = Math.pow(5, snafuNumber.length - i - 1);
    const digitValue = snafuDigitValues[snafuDigit];
    return decimalNumber + placeValue * digitValue;
  }, 0);
}

export function toSNAFU(decimal: number): string {
  return "";
}

export function main() {}
