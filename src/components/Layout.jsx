import TopBar from './TopBar';

export default function Layout({ children, maxWidth = 'max-w-3xl' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-8 !pt-28 relative">
      <TopBar />
      <div className={`${maxWidth} mx-auto`}>
        {children}
        <footer className="text-center mt-8 text-sm text-gray-500">
          © 2025-2026 DSO National Laboratories, Leadership Development Office (LDO).
        </footer>
      </div>
    </div>
  );
}
