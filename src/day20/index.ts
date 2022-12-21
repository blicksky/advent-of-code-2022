/**
 * [
 *   {
 *     value,
 *     next,
 *     prev
 *   }
 * ]
 */

type Node = {
  readonly value: number;
  next: Node;
  prev: Node;
};

export function parseInput(input: string) {
  const nodes: Node[] = input.split("\n").map((value) => {
    return {
      value: parseInt(value, 10),
    } as Node;
  });

  nodes.forEach((node, index) => {
    node.next = nodes.at(index + 1)!;
    node.prev = nodes.at(index - 1)!;
  });

  nodes.at(-1)!.next = nodes[0];

  return nodes;
}

export function main(nodes: Node[]): number {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    const movementMagnitude = Math.abs(node.value);

    const originalNextNode = node.next;
    const originalPrevNode = node.prev;
    originalNextNode.prev = originalPrevNode;
    originalPrevNode.next = originalNextNode;

    let newPrevNode = node.prev;
    for (let m = 0; m < movementMagnitude; m += 1) {
      newPrevNode = node.value > 0 ? newPrevNode.next : newPrevNode.prev;
    }

    const newNextNode = newPrevNode.next;

    newPrevNode.next = node;
    node.prev = newPrevNode;

    newNextNode.prev = node;
    node.next = newNextNode;
  }

  let zeroNode = nodes[0];

  while (zeroNode.value !== 0) {
    zeroNode = zeroNode.next;
  }

  const nodesFromZero = [];
  let walkNode = zeroNode;
  for (let i = 0; i < nodes.length; i += 1) {
    nodesFromZero.push(walkNode.value);
    walkNode = walkNode.next;
  }

  console.log(nodesFromZero);

  return (
    nodesFromZero[1000 % nodes.length] +
    nodesFromZero[2000 % nodes.length] +
    nodesFromZero[3000 % nodes.length]
  );
}
