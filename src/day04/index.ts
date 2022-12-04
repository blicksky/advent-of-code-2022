type Section = number;
type Assignment = [firstSection: Section, lastSection: Section];
type AssignmentPair = [elf1: Assignment, elf2: Assignment];

export function parseAssignments(
  input: string
): Array<[Assignment, Assignment]> {
  return input.split("\n").map((assignments) => {
    return assignments
      .split(",")
      .map((sections) =>
        sections.split("-").map((section) => parseInt(section, 10))
      );
  }) as Array<AssignmentPair>;
}

function fullyContains(assignments: AssignmentPair): boolean {
  const [
    [elf1FirstSection, elf1LastSection],
    [elf2FirstSection, elf2LastSection],
  ] = assignments;

  const firstSectionRelation = Math.sign(elf2FirstSection - elf1FirstSection);
  const lastSectionRelation = Math.sign(elf2LastSection - elf1LastSection);

  return (
    firstSectionRelation === 0 ||
    lastSectionRelation === 0 ||
    firstSectionRelation != lastSectionRelation
  );
}

export function countFullyContainedPairs(
  assignmentPairs: Array<AssignmentPair>
): number {
  return assignmentPairs.reduce((count, assignmentPair) => {
    return count + (fullyContains(assignmentPair) ? 1 : 0);
  }, 0);
}

function overlaps(assignments: AssignmentPair): boolean {
  const [
    [elf1FirstSection, elf1LastSection],
    [elf2FirstSection, elf2LastSection],
  ] = assignments;

  return (
    (elf1FirstSection <= elf1FirstSection &&
      elf1LastSection >= elf2FirstSection &&
      elf1FirstSection <= elf2FirstSection) ||
    (elf2LastSection >= elf1FirstSection &&
      elf2FirstSection <= elf1FirstSection)
  );
}

export function countOverlappingPairs(
  assignmentPairs: Array<AssignmentPair>
): number {
  return assignmentPairs.reduce((count, assignmentPair) => {
    return count + (overlaps(assignmentPair) ? 1 : 0);
  }, 0);
}
