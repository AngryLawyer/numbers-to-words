import { headAndTail } from "./utils";

export type Conversion = (
  value: number,
  conversions: readonly Conversion[]
) => string;

export class Converter {
  // List of conversion functions, from largest to smallest
  // Override this in your language classes
  conversions: readonly Conversion[] = [];

  convert(value: number): string {
    const [nextConversion, remainingConversions] = headAndTail(
      this.conversions
    );
    return nextConversion(value, remainingConversions);
  }
}
