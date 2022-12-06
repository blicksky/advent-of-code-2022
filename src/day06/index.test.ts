import { fn } from "./index";

describe("Day 6", () => {
    ([
        ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
        ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
        ["nppdvjthqldpwncqszvftbrmjlhg", 6],
        ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
        ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",11]
    ] as [string, number][]).forEach(([input, length]) => {
        it("fsef", () => {
            expect(fn(input, 4)).toEqual(length);
        });
    });
});
