import { range, headAndTail } from "../src/utils";

describe("range", () => {
  it("should produce a simple range", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("should produce an offset range", () => {
    expect(range(1, 6)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("headAndTail", () => {
  it("should handle arrays with one item", () => {
    expect(headAndTail([1])).toEqual([1, []]);
  });

  it("should handle longer lists", () => {
    expect(headAndTail([1, 2, 3])).toEqual([1, [2, 3]]);
  });
});
