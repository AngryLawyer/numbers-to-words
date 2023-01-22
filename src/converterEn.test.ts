import {
  getConjunction,
  convertUnderTwenty,
  convertTens,
  convertHundreds,
  convertThousands,
  convertMillions,
} from "../src/converterEn";

describe("getConjunction", () => {
  it("should give us an And if we're less than a hundred", () => {
    expect(getConjunction(1)).toBe(" and ");
    expect(getConjunction(99)).toBe(" and ");
  });

  it("should give us a comma if we're greater or equal to a hundred", () => {
    expect(getConjunction(100)).toBe(", ");
    expect(getConjunction(101)).toBe(", ");
  });
});

describe("Number parsing", () => {
  it("should handle single digits", () => {
    (
      [
        [1, "one"],
        [3, "three"],
        [5, "five"],
        [9, "nine"],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(convertUnderTwenty(value, [])).toBe(expected);
    });
  });

  it("should handle teen values", () => {
    (
      [
        [10, "ten"],
        [13, "thirteen"],
        [15, "fifteen"],
        [19, "nineteen"],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(convertUnderTwenty(value, [])).toBe(expected);
    });
  });

  it("should handle tens", () => {
    (
      [
        [20, "twenty"],
        [21, "twenty-one"],
        [29, "twenty-nine"],
        [30, "thirty"],
        [99, "ninety-nine"],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(convertTens(value, [convertUnderTwenty])).toBe(expected);
    });
  });

  it("should handle hundreds", () => {
    (
      [
        [100, "one hundred"],
        [101, "one hundred and one"],
        [119, "one hundred and nineteen"],
        [121, "one hundred and twenty-one"],
        [999, "nine hundred and ninety-nine"],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(convertHundreds(value, [convertTens, convertUnderTwenty])).toBe(
        expected
      );
    });
  });

  it("should handle thousands", () => {
    (
      [
        [1000, "one thousand"],
        [1001, "one thousand and one"],
        [1100, "one thousand, one hundred"],
        [1111, "one thousand, one hundred and eleven"],
        [10111, "ten thousand, one hundred and eleven"],
        [100111, "one hundred thousand, one hundred and eleven"],
        [
          999999,
          "nine hundred and ninety-nine thousand, nine hundred and ninety-nine",
        ],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(
        convertThousands(value, [
          convertHundreds,
          convertTens,
          convertUnderTwenty,
        ])
      ).toBe(expected);
    });
  });

  it("should handle millions", () => {
    (
      [
        [1_000_000, "one million"],
        [1_000_001, "one million and one"],
        [
          9999_999_999,
          "nine thousand, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine",
        ],
      ] as readonly [number, string][]
    ).forEach(([value, expected]) => {
      expect(
        convertMillions(value, [
          convertThousands,
          convertHundreds,
          convertTens,
          convertUnderTwenty,
        ])
      ).toBe(expected);
    });
  });
});
