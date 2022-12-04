class Play {
  static Rock = new Play(1);
  static Paper = new Play(2);
  static Scissors = new Play(3);

  readonly value: number;
  winningPlay?: Play;
  losingPlay?: Play;

  constructor(value: number) {
    this.value = value;
  }
}

// this version of typescript doesn't seem to support static blocks...
Play.Rock.winningPlay = Play.Paper;
Play.Paper.winningPlay = Play.Scissors;
Play.Scissors.winningPlay = Play.Rock;

Play.Rock.losingPlay = Play.Scissors;
Play.Paper.losingPlay = Play.Rock;
Play.Scissors.losingPlay = Play.Paper;

enum Outcome {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

const PlaysBySymbol: Readonly<Record<string, Play>> = {
  A: Play.Rock,
  B: Play.Paper,
  C: Play.Scissors,
  X: Play.Rock,
  Y: Play.Paper,
  Z: Play.Scissors,
};

const OutcomesBySymbol: Readonly<Record<string, Outcome>> = {
  X: Outcome.Lose,
  Y: Outcome.Draw,
  Z: Outcome.Win,
};

export function getScoreByPlay(input: Array<[string, string]>): number {
  const roundPlays = input.map((plays) =>
    plays.map((play) => PlaysBySymbol[play])
  );

  const roundScores = roundPlays.map(([opponentPlay, yourPlay]) => {
    switch (true) {
      case yourPlay === opponentPlay:
        return Outcome.Draw + yourPlay.value;
      case yourPlay.winningPlay === opponentPlay:
        return Outcome.Lose + yourPlay.value;
      case yourPlay.losingPlay === opponentPlay:
        return Outcome.Win + yourPlay.value;
      default:
        throw new Error("Unexpected play");
    }
  });

  return roundScores.reduce((sum, roundScore) => sum + roundScore);
}

export function getScoreByOutcome(input: Array<[string, string]>): number {
  const roundPlays = input.map(([opponentPlay, outcome]): [Play, Outcome] => [
    PlaysBySymbol[opponentPlay],
    OutcomesBySymbol[outcome],
  ]);

  const roundScores = roundPlays.map(([opponentPlay, outcome]) => {
    switch (outcome) {
      case Outcome.Draw:
        return Outcome.Draw + opponentPlay.value;
      case Outcome.Lose:
        return Outcome.Lose + (opponentPlay.losingPlay?.value ?? 0);
      case Outcome.Win:
        return Outcome.Win + (opponentPlay.winningPlay?.value ?? 0);
      default:
        throw new Error("Unexpected outcome");
    }
  });

  return roundScores.reduce((sum, roundScore) => sum + roundScore);
}
