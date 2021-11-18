const MAX = 99;

type Answer = {
  a: number;
  b: number;
  product: number;
  sum: number;
};

const allPossibleAnswers: Answer[] = [];
for (let a = 2; a <= MAX; a++)
  for (let b = a; b <= MAX; b++) {
    const product = a * b;
    const sum = a + b;
    allPossibleAnswers.push({ a, b, product, sum });
  }

function getPossibleAnswersFromProduct(product: number): Answer[] {
  const answers: Answer[] = [];
  for (let a = 2; a <= product / 2; a++) {
    if (product % a !== 0) continue;
    const b = Math.round(product / a);
    if (a > b) break;
    if (a > MAX || b > MAX) continue;
    answers.push({ a, b, product: a * b, sum: a + b });
  }
  return answers;
}

function getPossibleAnswersFromSum(sum: number): Answer[] {
  const answers: Answer[] = [];
  for (let a = 2; a <= sum - 2; a++) {
    const b = sum - a;
    if (a > b) break;
    if (a > MAX || b > MAX) continue;
    answers.push({ a, b, product: a * b, sum: a + b });
  }
  return answers;
}
console.log(`There are ${allPossibleAnswers.length} possible pairs of a and b`);

const sentence1 = allPossibleAnswers.filter(
  ({ product }) => getPossibleAnswersFromProduct(product).length >= 2
);
console.log(`sentence 1 : ${sentence1.length} possible answer/s`);

const sentence2 = allPossibleAnswers.filter(({ sum }) => {
  const answers = getPossibleAnswersFromSum(sum);
  return answers.every((a) => {
    return getPossibleAnswersFromProduct(a.product).length >= 2;
  });
});

console.log(`sentence 2 : ${sentence2.length} possible answer/s`);

console.log(`Possible sums :`, new Set(sentence2.map((x) => x.sum)));

const sentence3 = sentence1.filter(({ a, b, product }) => {
  const list = getPossibleAnswersFromProduct(product);
  const okAnswers = list.filter(({ a, b }) =>
    sentence2.find((ans) => ans.a === a && ans.b === b)
  );
  return okAnswers.length === 1 && okAnswers[0].a === a && okAnswers[0].b === b;
});

console.log(`sentence 3 : ${sentence3.length} possible answer/s`);

const sentence4 = sentence2.filter(({ a, b, sum }) => {
  const list = getPossibleAnswersFromSum(sum);
  const okAnswers = list.filter(({ a, b }) =>
    sentence3.find((ans) => ans.a === a && ans.b === b)
  );
  return okAnswers.length === 1 && okAnswers[0].a === a && okAnswers[0].b === b;
});

console.log(`sentence 4 : ${sentence4.length} possible answer/s`);
console.log(sentence4);
