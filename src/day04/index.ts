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

/*
.234.....  2-4
.....678.  6-8

.23......  2-3
...45....  4-5

....567..  5-7
......789  7-9

.2345678.  2-8
..34567..  3-7

.....6...  6-6
...456...  4-6

.23456...  2-6
...45678.  4-8
*/

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
