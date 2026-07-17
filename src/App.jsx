import { useEffect, useState } from 'react';
import { buildShuffledQuiz } from './data/questions';
import { scoreAnswers } from './lib/score';
import { submitResult } from './lib/supabase';
import Quiz from './components/Quiz';
import Results from './components/Results';
import TooManyNA from './components/TooManyNA';
import Admin from './components/admin/Admin';

// ponytail: hash routing — GitHub Pages has no server rewrites, so #/admin beats a router dep
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const [quiz, setQuiz] = useState(buildShuffledQuiz);
  const [result, setResult] = useState(null);

  const handleComplete = (answers) => {
    const scored = scoreAnswers(answers);
    setResult(scored);
    if (!scored.tooManyNA) {
      submitResult(
        scored,
        answers.map((a, i) => ({
          questionNumber: i + 1,
          selected: a.text,
          selectedType: a.type,
          options: a.options
        }))
      ).then(({ error }) => {
        if (error) console.error('Failed to save result:', error.message);
      });
    }
  };

  const reset = () => {
    setResult(null);
    setQuiz(buildShuffledQuiz());
  };

  if (hash.startsWith('#/admin')) return <Admin />;
  if (result?.tooManyNA) {
    return <TooManyNA naCount={result.naCount} totalQuestions={result.totalQuestions} onReset={reset} />;
  }
  if (result) return <Results result={result} onReset={reset} />;
  return <Quiz key={quiz[0].q} quiz={quiz} onComplete={handleComplete} />;
}
