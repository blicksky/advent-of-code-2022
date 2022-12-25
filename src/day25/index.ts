export function parseInput(input: string) {
  return input.split("\n");
}

const snafuDigitValues: Record<string, number> = {
  "=": -2,
  "-": -1,
  "0": 0,
  "1": 1,
  "2": 2,
} as const;

export function fromSNAFU([...snafuNumber]: string): number {
  return snafuNumber.reduce((decimalNumber, snafuDigit, i) => {
    const placeValue = Math.pow(5, snafuNumber.length - i - 1);
    const digitValue = snafuDigitValues[snafuDigit];
    return decimalNumber + placeValue * digitValue;
  }, 0);
}

export function toSNAFU(decimalNumber: number): string {
  const pentalNumber = `0${decimalNumber.toString(5)}`;
  const pentalDigits = Array.from(pentalNumber, (digit) => parseInt(digit, 10));
  const snafuDigits: string[] = [];

  for (let i = pentalDigits.length - 1; i >= 0; i -= 1) {
    const pentalDigit = pentalDigits[i];

    switch (pentalDigit) {
      case 3:
        snafuDigits.unshift("=");
        pentalDigits[i - 1] += 1;
        break;
      case 4:
        snafuDigits.unshift("-");
        pentalDigits[i - 1] += 1;
        break;
      case 5:
        snafuDigits.unshift("0");
        pentalDigits[i - 1] += 1;
        break;
      default:
        snafuDigits.unshift(pentalDigit.toString(10));
    }
  }

  if (snafuDigits[0] === "0") {
    snafuDigits.shift();
  }

  return snafuDigits.join("");
}

export function main(snafuNumbers: string[]): string {
  const decimalSum = snafuNumbers.reduce((decimalSum, snafuNumber) => {
    return decimalSum + fromSNAFU(snafuNumber);
  }, 0);

  return toSNAFU(decimalSum);
}
