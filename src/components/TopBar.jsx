import { UNBRANDED } from '../lib/variant';

const BIRDS = ['🦚', '🦉', '🦢', '🦅'];

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!UNBRANDED && (
            <>
              <img src="logo.png" alt="DSO National Laboratories logo" className="h-8 sm:h-10 w-auto object-contain" />
              <img src="logo2.png" alt="Leadership Development Office logo" className="h-8 sm:h-10 w-auto object-contain" />
            </>
          )}
        </div>
        <div className="flex items-center gap-1 text-3xl sm:text-4xl" aria-hidden="true">
          {BIRDS.map((b) => <span key={b}>{b}</span>)}
        </div>
      </div>
    </div>
  );
}
