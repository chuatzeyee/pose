import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreAnswers } from '../src/lib/score.js';

const answer = (type) => ({ type });

test('scores and percentages sum to 100', () => {
  const answers = [
    ...Array(7).fill(answer('Peacock')),
    ...Array(6).fill(answer('Owl')),
    ...Array(4).fill(answer('Swan')),
    ...Array(3).fill(answer('Eagle'))
  ];
  const r = scoreAnswers(answers);
  assert.equal(r.tooManyNA, false);
  assert.equal(r.primary[0], 'Peacock');
  assert.equal(r.secondary[0], 'Owl');
  const sum = Object.values(r.percentages).reduce((a, b) => a + b, 0);
  assert.equal(sum, 100);
});

test('rounding never drifts from 100 across uneven splits', () => {
  const answers = [
    ...Array(6).fill(answer('Peacock')),
    ...Array(6).fill(answer('Owl')),
    ...Array(6).fill(answer('Swan')),
    ...Array(2).fill(answer('Eagle'))
  ];
  const sum = Object.values(scoreAnswers(answers).percentages).reduce((a, b) => a + b, 0);
  assert.equal(sum, 100);
});

test('too many N/A flags the result', () => {
  const answers = [...Array(11).fill(answer('N/A')), ...Array(9).fill(answer('Owl'))];
  const r = scoreAnswers(answers);
  assert.equal(r.tooManyNA, true);
  assert.equal(r.naCount, 11);
});

test('fewer than 5 valid answers flags even with few N/A', () => {
  const r = scoreAnswers([...Array(4).fill(answer('Eagle')), ...Array(4).fill(answer('N/A'))]);
  assert.equal(r.tooManyNA, true);
});

test('N/A excluded from percentages', () => {
  const r = scoreAnswers([...Array(5).fill(answer('Swan')), ...Array(5).fill(answer('N/A'))]);
  assert.equal(r.percentages.Swan, 100);
  assert.equal(r.total, 5);
});
