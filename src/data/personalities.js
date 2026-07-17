export const personalityDescriptions = {
  Peacock: {
    emoji: '🦚',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500',
    hex: '#ef4444',
    borderColor: 'border-red-300',
    title: 'The Peacock',
    subtitle: 'Expressive & Enthusiastic',
    description: 'You are positive, sociable and full of energy! Peacocks are enthusiastic, fun-loving and always exploring possibilities and different way of doing things. You are also spontaneous, creative and have a natural ability to inspire and motivate others with your optimism and charm. You can be easily distracted at times and be seen as not being good with details or time management.'
  },
  Eagle: {
    emoji: '🦅',
    color: 'from-amber-700 to-amber-800',
    bgColor: 'bg-amber-700',
    hex: '#b45309',
    borderColor: 'border-amber-400',
    title: 'The Eagle',
    subtitle: 'Result Seeker & Decisive',
    description: 'You are a natural achiever who takes charge and gets things done! Eagles are assertive, driven and capable of taking decisive actions to achieve desired results. You thrive on overcoming challenges and take pride in producing excellent outcomes. You can be blunt at times, prioritising results at the expense of everything else.'
  },
  Owl: {
    emoji: '🦉',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500',
    hex: '#22c55e',
    borderColor: 'border-green-300',
    title: 'The Owl',
    subtitle: 'Analytical & Precise',
    description: 'You are logical, systematic and analytical! Owls are orderly, methodical and effective in completing tasks involving established processes and procedures. You are also thoughtful and especially sharp when it comes to picking up inaccuracies and inconsistencies. You may appear critical at times, requiring unreasonable amount of details before making decisions.'
  },
  Swan: {
    emoji: '🦢',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500',
    hex: '#3b82f6',
    borderColor: 'border-blue-300',
    title: 'The Swan',
    subtitle: 'Supportive & Harmonious',
    description: 'You are warm, caring and sincere! Swans are people-oriented, friendly and excellent listeners who value relationships and harmony. You\'re a team player who pays special attention to teamwork, morale and well-being of every member. You can be seen to be hesitant and indecisive at times, being bogged down by the need to please everyone.'
  }
};

// ponytail: red→blue→green→amber ordering is the CVD-safe adjacency (validated ΔE 7.3 + direct labels); don't reorder casually
export const BAR_ORDER = ['Peacock', 'Swan', 'Owl', 'Eagle'];
