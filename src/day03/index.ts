export function parseInput(input: string) {
  return input.split("\n");
}

function getCommonItem(items: string): string {
  const secondCompartmentItems = new Set(items.slice(items.length / 2));

  for (const item of items) {
    if (secondCompartmentItems.has(item)) {
      return item;
    }
  }

  throw new Error("No common item found");
}

function getItemPriority(item: string): number {
  const charCode = item.charCodeAt(0);
  return charCode - (charCode <= 90 ? 38 : 96);
}

export function sumCommonItemPriorities(rucksacks: Array<string>): number {
  return rucksacks.reduce((sum, items) => {
    const commonItem = getCommonItem(items);
    return sum + getItemPriority(commonItem);
  }, 0);
}

// part 2

const GROUP_SIZE = 3;

function getGroupBadgePriority(
  firstRucksackItems: string,
  secondRucksackItems: string,
  thirdRucksackItems: string
) {
  const firstItemSet = new Set(firstRucksackItems);
  const secondItemSet = new Set(secondRucksackItems);
  const thirdItemSet = new Set(thirdRucksackItems);

  for (const item of firstItemSet.values()) {
    if (!(secondItemSet.has(item) && thirdItemSet.has(item))) {
      firstItemSet.delete(item);
    }
  }

  const badge = Array.from(firstItemSet.values()).pop();

  if (!badge) {
    throw new Error(
      `Unable to find badge for items: [${firstRucksackItems}] [${secondRucksackItems}] [${thirdRucksackItems}]`
    );
  }

  return getItemPriority(badge);
}

export function sumGroupBadgePriorities(rucksacks: Array<string>) {
  let sumOfPriorities = 0;

  for (let group = 0; group < rucksacks.length; group += GROUP_SIZE) {
    sumOfPriorities += getGroupBadgePriority(
      rucksacks[group],
      rucksacks[group + 1],
      rucksacks[group + 2]
    );
  }

  return sumOfPriorities;
}
