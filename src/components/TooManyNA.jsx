import Layout from './Layout';

export default function TooManyNA({ naCount, totalQuestions, onReset }) {
  return (
    <Layout>
      <div className="text-center mb-8 mt-8 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Uh... About That
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center animate-fade-in">
        <div className="text-8xl mb-6">🤷</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">We Can't Read Your Mind (Yet)</h2>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          So here's the thing... you hit "N/A"{' '}
          <span className="font-bold text-purple-600">{naCount} times</span> out of {totalQuestions} questions.
          That's like showing up to a personality test and saying "I'd rather not say" to everything.
        </p>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We need at least <span className="font-bold">some</span> answers to work with if you want us to tell
          you whether you're a Peacock or an Eagle. Otherwise, we're just guessing, and honestly? That's not
          our vibe. 🦆
        </p>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
          <p className="text-lg text-gray-700">
            <span className="font-bold">Pro tip:</span> Try answering at least 10-15 questions with actual
            traits instead of "N/A". We promise it won't hurt... much. 😏
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Okay Fine, Let Me Try Again
      </button>
    </Layout>
  );
}
