import { ConverterEn } from "./converterEn";
import { range } from "./utils";

function main(args: readonly string[]) {
  let start = 1;
  let end = 1_000_000;

  switch (args.length) {
    case 2:
      start = parseInt(args[0], 10);
      end = parseInt(args[1], 10);
      break;
    case 1:
      start = parseInt(args[0], 10);
      break;
    case 0:
      break;
    default:
      console.log("Pass to two arguments to set the low and high endpoints");
  }

  if (isNaN(start) || isNaN(end)) {
    console.log("Bounds must be valid integers");
    return;
  }

  if (start > end) {
    console.log("Lower bound must be less or equal to upper bound");
    return;
  }

  if (start < 1 || end > 1_000_000) {
    console.log(
      "Bounds must be integers greater than 0 and less than 1,000,001"
    );
    return;
  }

  const converter = new ConverterEn();

  range(start, end + 1).forEach((n) => {
    console.log(converter.convert(n));
  });
}

main(process.argv.slice(2));
