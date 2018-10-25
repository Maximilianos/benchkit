import { getValidTests } from "./utils";

export default function benchmark(tests, { context, given = [] } = {}) {
  getValidTests(tests)
    .map(([desc, test]) => [desc, bench(test.bind(context, ...given))])
    .sort(([desc, et], [desc2, et2]) => et - et2)
    .forEach(([desc, et], i) =>
      console.log(
        `0${parseInt(i, 10) + 1}) Took | ${et}ms\t| to compute "${desc}"`
      )
    );
}

function bench(test) {
  const t1 = performance.now();
  test();
  const t2 = performance.now();
  return (t2 - t1).toFixed(1);
}
