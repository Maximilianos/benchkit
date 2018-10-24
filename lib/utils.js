export function getValidTests(tests) {
  if (typeof tests === "function") return [[tests.name, tests]];
  return Object.entries(tests).map(([key, test]) => {
    if (typeof test !== "function")
      throw new Error(
        `expected test type to be "function" but got ${typeof test}`
      );
    const desc = isNaN(key) ? key : test.name;
    return [desc, test];
  });
}
