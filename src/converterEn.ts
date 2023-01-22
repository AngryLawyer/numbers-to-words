import { headAndTail } from "./utils";
import { Converter, Conversion } from "./converter";

export function getConjunction(value: number): string {
  if (value >= 100) {
    return ", ";
  }
  return " and ";
}

export function convertUnderTwenty(
  value: number,
  _conversions: readonly Conversion[]
): string {
  return [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ][value - 1];
}

export function convertTens(
  value: number,
  conversions: readonly Conversion[]
): string {
  const [nextConversion, remainingConversions] = headAndTail(conversions);
  if (value < 20) {
    return nextConversion(value, remainingConversions);
  }
  const checked = Math.floor(value / 10);
  const remainder = value % 10;
  let out = [
    "",
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ][checked - 1];

  if (remainder > 0) {
    out += "-" + nextConversion(remainder, remainingConversions);
  }
  return out;
}

export function convertHundreds(
  value: number,
  conversions: readonly Conversion[]
): string {
  const [nextConversion, remainingConversions] = headAndTail(conversions);
  if (value < 100) {
    return nextConversion(value, remainingConversions);
  }
  const checked = Math.floor(value / 100);
  const remainder = value % 100;
  let out = nextConversion(checked, remainingConversions) + " hundred";

  if (remainder > 0) {
    out +=
      getConjunction(remainder) +
      nextConversion(remainder, remainingConversions);
  }
  return out;
}

export function convertThousands(
  value: number,
  conversions: readonly Conversion[]
): string {
  const [nextConversion, remainingConversions] = headAndTail(conversions);
  if (value < 1000) {
    return nextConversion(value, remainingConversions);
  }
  const checked = Math.floor(value / 1000);
  const remainder = value % 1000;
  let out = nextConversion(checked, remainingConversions) + " thousand";

  if (remainder > 0) {
    out +=
      getConjunction(remainder) +
      nextConversion(remainder, remainingConversions);
  }
  return out;
}

export function convertMillions(
  value: number,
  conversions: readonly Conversion[]
): string {
  const [nextConversion, remainingConversions] = headAndTail(conversions);
  if (value < 1_000_000) {
    return nextConversion(value, remainingConversions);
  }
  const checked = Math.floor(value / 1_000_000);
  const remainder = value % 1_000_000;
  let out = nextConversion(checked, remainingConversions) + " million";

  if (remainder > 0) {
    out +=
      getConjunction(remainder) +
      nextConversion(remainder, remainingConversions);
  }
  return out;
}

export class ConverterEn extends Converter {
  conversions = [
    convertMillions,
    convertThousands,
    convertHundreds,
    convertTens,
    convertUnderTwenty,
  ];
}
