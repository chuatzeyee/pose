import { createClient } from '@supabase/supabase-js';
import { VARIANT } from './variant';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn('Supabase env vars missing — results will not be saved and admin login is disabled.');
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function submitResult(result, answers) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  return supabase.from('pose_results').insert({
    scores: result.scores,
    percentages: result.percentages,
    answers,
    primary_type: result.primary[0],
    primary_pct: result.primary[1],
    secondary_type: result.secondary[0],
    secondary_pct: result.secondary[1],
    na_count: result.naCount,
    total_answered: result.totalQuestions,
    source: VARIANT
  });
}
