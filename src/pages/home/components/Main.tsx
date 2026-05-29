import { Link } from 'react-router-dom';
import { DashboardPreview, FeatureCard } from './';
import { User as FirebaseUser } from 'firebase/auth';

const Main = ({ user }: { user: FirebaseUser | null }) => {
  return (
    <main className="flex-1 pt-32 pb-20 px-6 relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl border border-gray-400/20 dark:border-gray-500/20 rounded-full px-4 py-1.5 mb-8 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-mono">
          Academic capstone project
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-center text-text-primary-light dark:text-text-primary-dark mb-6 leading-[1.1]">
        A comprehensive <br className="hidden md:block" />
        <span className="text-primary">
          learning experience.
        </span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-center text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mb-10 leading-relaxed">
        Built entirely from scratch to demonstrate full-stack architecture, clean UI/UX implementation, and robust state management in React.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to={user ? '/dashboard' : '/signup'}
          className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-base shadow-premium hover:shadow-premium-hover transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
        >
          {user ? 'Go to Dashboard' : 'Get Started'}
        </Link>
        <a
          href="#features"
          className="px-8 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark font-medium text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-all w-full sm:w-auto text-center"
        >
          Learn More
        </a>
      </div>

      {/* Dashboard Live Mockup */}
      <DashboardPreview />

      {/* ── Features Section */}
      <div id="features" className="w-full mt-32 grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon="code"
          title="Clean Architecture"
          desc="Structured using industry-standard patterns, separating presentation from business logic and ensuring scalability."
        />
        <FeatureCard
          icon="palette"
          title="Premium SaaS UI/UX"
          desc="Designed with a focus on usability, clean typography, and professional aesthetics without heavy styling frameworks."
        />
        <FeatureCard
          icon="developer_mode"
          title="Modern Stack"
          desc="Powered by React, Vite, Tailwind CSS, and Firebase for a blazing fast, secure, and reliable application."
        />
      </div>
    </main>
  );
};

export { Main };
