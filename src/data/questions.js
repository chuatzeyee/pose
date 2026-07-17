export const questions = [
  { q: 1, options: [
    { text: 'Possibilities', type: 'Peacock' },
    { text: 'Procedural', type: 'Owl' },
    { text: 'People Focused', type: 'Swan' },
    { text: 'Purposeful', type: 'Eagle' }
  ]},
  { q: 2, options: [
    { text: 'Avoid Mundane Work', type: 'Peacock' },
    { text: 'Analytical', type: 'Owl' },
    { text: 'Avoid Conflict', type: 'Swan' },
    { text: 'Assertive', type: 'Eagle' }
  ]},
  { q: 3, options: [
    { text: 'Diversity is valued', type: 'Peacock' },
    { text: 'Deliberate with process', type: 'Owl' },
    { text: 'Driven by Relationships', type: 'Swan' },
    { text: 'Decisive', type: 'Eagle' }
  ]},
  { q: 4, options: [
    { text: 'Motivated by Creativity', type: 'Peacock' },
    { text: 'Meticulous', type: 'Owl' },
    { text: 'Mediator of Conflicts', type: 'Swan' },
    { text: 'Motivated by Results', type: 'Eagle' }
  ]},
  { q: 5, options: [
    { text: 'Innovative', type: 'Peacock' },
    { text: 'Inaccuracies readily corrected', type: 'Owl' },
    { text: 'Inclusive', type: 'Swan' },
    { text: 'Inspired by achievements', type: 'Eagle' }
  ]},
  { q: 6, options: [
    { text: 'Hyper (easily distracted)', type: 'Peacock' },
    { text: 'Hard to please (needs a lot of details)', type: 'Owl' },
    { text: 'Hesitant (wants to please everyone)', type: 'Swan' },
    { text: 'Head-Strong (prioritises results)', type: 'Eagle' }
  ]},
  { q: 7, options: [
    { text: 'Fun loving', type: 'Peacock' },
    { text: 'Follow SOP', type: 'Owl' },
    { text: 'Feelings', type: 'Swan' },
    { text: 'Firm', type: 'Eagle' }
  ]},
  { q: 8, options: [
    { text: 'Discover New Things', type: 'Peacock' },
    { text: 'Detailed', type: 'Owl' },
    { text: 'Diplomatic', type: 'Swan' },
    { text: 'Determined', type: 'Eagle' }
  ]},
  { q: 9, options: [
    { text: 'Distracted Easily', type: 'Peacock' },
    { text: 'Dwell too much on details', type: 'Owl' },
    { text: 'Dislike disagreements and conflicts', type: 'Swan' },
    { text: 'Dominating', type: 'Eagle' }
  ]},
  { q: 10, options: [
    { text: 'Spontaneous', type: 'Peacock' },
    { text: 'Systematic', type: 'Owl' },
    { text: 'Soft-Hearted', type: 'Swan' },
    { text: 'Self-Confident', type: 'Eagle' }
  ]},
  { q: 11, options: [
    { text: 'Sociable', type: 'Peacock' },
    { text: 'Specific', type: 'Owl' },
    { text: 'Sensitive', type: 'Swan' },
    { text: 'Self-Disciplined', type: 'Eagle' }
  ]},
  { q: 12, options: [
    { text: 'Optimistic', type: 'Peacock' },
    { text: 'Orderly', type: 'Owl' },
    { text: 'Obliging', type: 'Swan' },
    { text: 'Organisation Focused', type: 'Eagle' }
  ]},
  { q: 13, options: [
    { text: 'Positive', type: 'Peacock' },
    { text: 'Planner', type: 'Owl' },
    { text: 'Patient', type: 'Swan' },
    { text: 'Productive', type: 'Eagle' }
  ]},
  { q: 14, options: [
    { text: 'Creative', type: 'Peacock' },
    { text: 'Comprehensive', type: 'Owl' },
    { text: 'Considerate', type: 'Swan' },
    { text: 'Competitive', type: 'Eagle' }
  ]},
  { q: 15, options: [
    { text: 'Carefree (Overly)', type: 'Peacock' },
    { text: 'Critical (Overly)', type: 'Owl' },
    { text: 'Compromising (Overly)', type: 'Swan' },
    { text: 'Call the Shots (Overly)', type: 'Eagle' }
  ]},
  { q: 16, options: [
    { text: 'Expressive', type: 'Peacock' },
    { text: 'Exact', type: 'Owl' },
    { text: 'Empathic', type: 'Swan' },
    { text: 'Excellence', type: 'Eagle' }
  ]},
  { q: 17, options: [
    { text: 'Playful', type: 'Peacock' },
    { text: 'Precise', type: 'Owl' },
    { text: 'Peaceful', type: 'Swan' },
    { text: 'Persistent', type: 'Eagle' }
  ]},
  { q: 18, options: [
    { text: 'Lively', type: 'Peacock' },
    { text: 'Logical', type: 'Owl' },
    { text: 'Listener', type: 'Swan' },
    { text: 'Leader', type: 'Eagle' }
  ]},
  { q: 19, options: [
    { text: 'Bored Easily', type: 'Peacock' },
    { text: 'Bogged down by processes', type: 'Owl' },
    { text: 'Bounded by fear of offending others', type: 'Swan' },
    { text: 'Blunt', type: 'Eagle' }
  ]},
  { q: 20, options: [
    { text: 'Talker', type: 'Peacock' },
    { text: 'Thoughtful', type: 'Owl' },
    { text: 'Tolerant', type: 'Swan' },
    { text: 'Tenacious', type: 'Eagle' }
  ]}
];

export function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const buildShuffledQuiz = () =>
  shuffle(questions.map((question) => ({ ...question, options: shuffle(question.options) })));
