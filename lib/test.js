import deep from "deep-eql";
import { getValidTests } from "./utils";

export default function test(tests, { name, specs, verbose } = {}) {
  console.log(name ? `Tests (${name}):` : 'Tests:');
  getValidTests(tests).forEach(([desc, test], i) => {
    const results = specs.map(({ context, given, expect }) => {
      const result = test.apply(context, given);
      const didPass = deep(result, expect);
      return { given, expect, result, didPass };
    });
    const didPassAll = results.every(({ didPass }) => didPass);
    const didFailAll = results.every(({ didPass }) => !didPass);

    console.log(
      `0${parseInt(i, 10) + 1})`,
      getSymbol(didPassAll),
      getGenericResultDescription(didPassAll, didFailAll),
      `when testing "${desc}"`
    );

    for (let { given, expect, result, didPass } of results) {
      if (verbose || !didPass) log(didPass, result, given, expect);
    }
  });
}

function getSymbol(didPass) {
  return didPass ? "✅" : "❌";
}

function getGenericResultDescription(didPassAll, didFailAll) {
  if (didPassAll) return "All passed";
  if (didFailAll) return "All failed";
  return "Some failed";
}

function log(didPass, result, givenInput, expectedResult) {
  console.log(
    "   ",
    getSymbol(didPass),
    "Given:",
    getPrettyExpInput(givenInput),
    "expected:",
    expectedResult,
    didPass ? "got:" : "but got:",
    result
  );
}

function getPrettyExpInput(input) {
  return input.length > 1 ? input : input[0];
}
