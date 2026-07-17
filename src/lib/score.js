export const TYPES = ['Peacock', 'Owl', 'Swan', 'Eagle'];

const MIN_VALID_ANSWERS = 5;

// Largest-remainder rounding so percentages always sum to exactly 100
function toPercentages(scores, total) {
  if (total === 0) return Object.fromEntries(TYPES.map((t) => [t, 0]));
  const exact = TYPES.map((t) => {
    const value = (scores[t] / total) * 100;
    return { t, floor: Math.floor(value), remainder: value - Math.floor(value) };
  });
  const shortfall = 100 - exact.reduce((sum, e) => sum + e.floor, 0);
  const bumped = new Set(
    [...exact].sort((a, b) => b.remainder - a.remainder).slice(0, shortfall).map((e) => e.t)
  );
  return Object.fromEntries(exact.map((e) => [e.t, e.floor + (bumped.has(e.t) ? 1 : 0)]));
}

/**
 * @param {Array<{type: string}>} answers one entry per answered question; type is a bird or 'N/A'
 */
export function scoreAnswers(answers) {
  const scores = Object.fromEntries(TYPES.map((t) => [t, 0]));
  let naCount = 0;
  answers.forEach(({ type }) => {
    if (type === 'N/A') naCount += 1;
    else scores[type] += 1;
  });

  const total = answers.length - naCount;
  const tooManyNA = total < MIN_VALID_ANSWERS || naCount > answers.length / 2;
  const percentages = toPercentages(scores, total);
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);

  return {
    scores,
    percentages,
    primary: sorted[0],
    secondary: sorted[1],
    naCount,
    total,
    totalQuestions: answers.length,
    tooManyNA
  };
}
