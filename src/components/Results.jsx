import { useRef } from 'react';
import { Share2, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import Layout from './Layout';
import { personalityDescriptions, BAR_ORDER } from '../data/personalities';

function TypeCard({ type }) {
  const p = personalityDescriptions[type];
  return (
    <div className={`${p.bgColor} rounded-3xl p-6 flex flex-col items-start`}>
      <div className="bg-white rounded-xl p-3 mb-4">
        <span className="text-4xl">{p.emoji}</span>
      </div>
      <h4 className="text-white font-bold text-lg mb-2">{p.title}</h4>
      <p className="text-white text-sm leading-relaxed">{p.description}</p>
    </div>
  );
}

function PersonalityHighlight({ type, percent, rank }) {
  const p = personalityDescriptions[type];
  const primary = rank === 'Primary';
  return (
    <>
      <div className={`text-center ${primary ? 'mb-8' : 'mb-3'}`}>
        <div className={`${primary ? 'text-8xl mb-4' : 'text-6xl mb-3'}`}>{p.emoji}</div>
        <h2 className={`${primary ? 'text-4xl' : 'text-3xl'} font-bold bg-gradient-to-r ${p.color} bg-clip-text text-transparent mb-2`}>
          {p.title}
        </h2>
        <p className={`${primary ? 'text-2xl mb-4' : 'text-xl mb-3'} text-gray-600`}>{p.subtitle}</p>
        <div className={`inline-block bg-gradient-to-r ${p.color} text-white ${primary ? 'px-6 py-3 text-2xl' : 'px-5 py-2 text-xl'} rounded-full font-bold`}>
          {percent}% {rank}
        </div>
      </div>
      <div
        className={`bg-white border-2 ${p.borderColor} rounded-2xl p-6 mb-8`}
        style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}
      >
        <p className="text-gray-800 text-lg leading-relaxed">{p.description}</p>
      </div>
    </>
  );
}

export default function Results({ result, onReset }) {
  const resultsRef = useRef(null);
  const [primaryType, primaryPercent] = result.primary;
  const [secondaryType, secondaryPercent] = result.secondary;

  const shareResults = async () => {
    const shareText = `I just took the POSE Personality Test! 🎉\n\nMy personality blend:\n${personalityDescriptions[primaryType].emoji} ${primaryType} (${primaryPercent}%)\n${personalityDescriptions[secondaryType].emoji} ${secondaryType} (${secondaryPercent}%)\n\nDiscover your personality at: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My POSE Personality Results', text: shareText });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard! You can now paste and share.');
    } catch {
      alert('Could not copy automatically — please screenshot your results instead.');
    }
  };

  const downloadResults = async () => {
    if (!resultsRef.current) return;
    try {
      const dataUrl = await toPng(resultsRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#f0f0f0'
      });
      const link = document.createElement('a');
      link.download = 'my-pose-personality.png';
      link.href = dataUrl;
      link.click();
    } catch {
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <Layout maxWidth="max-w-4xl">
      <div className="text-center mb-8 mt-8 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Your POSE Profile
        </h1>
        <p className="text-gray-600 text-lg">Discover your unique personality blend</p>
      </div>

      <div
        className="bg-white shadow-2xl p-6 mb-6 animate-slide-up border border-gray-300"
        style={{ borderRadius: '3rem', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        ref={resultsRef}
      >
        <PersonalityHighlight type={primaryType} percent={primaryPercent} rank="Primary" />
        <PersonalityHighlight type={secondaryType} percent={secondaryPercent} rank="Secondary" />

        <div className="border-t-2 border-gray-200 mb-8" />

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your POSE Personality Profile</h3>
          <div className="px-6">
            <div className="flex mb-2">
              {BAR_ORDER.map((type) => (
                <div key={type} className="flex items-center justify-center" style={{ width: `${result.percentages[type]}%` }}>
                  {result.percentages[type] > 0 && <span className="text-3xl">{personalityDescriptions[type].emoji}</span>}
                </div>
              ))}
            </div>
            <div className="w-full h-12 rounded-full flex overflow-hidden">
              {BAR_ORDER.map((type) => (
                <div
                  key={type}
                  className={`bg-gradient-to-r ${personalityDescriptions[type].color} flex items-center justify-center transition-all duration-1000 ease-out border-r-2 border-white last:border-r-0`}
                  style={{ width: `${result.percentages[type]}%` }}
                >
                  {result.percentages[type] >= 8 && (
                    <span className="text-white font-bold text-sm">{result.percentages[type]}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 mb-8" />

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Which Bird Are You?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Peacock', 'Owl', 'Swan', 'Eagle'].map((type) => <TypeCard key={type} type={type} />)}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={shareResults}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share My Personality
        </button>
        <button
          onClick={downloadResults}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download as Image
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Take the Test Again
      </button>
    </Layout>
  );
}
