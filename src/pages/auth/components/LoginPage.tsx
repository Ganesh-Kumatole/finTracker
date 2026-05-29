import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { IconName } from '@/shared/components/Icon';
import FormInput from '@/shared/components/FormInput';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    globalError,
    loading,
    googleLoading,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handleSubmit,
    handleGoogleSignIn,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
      {/* ── Left Branding Panel ──────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 bg-primary p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-white/5" />

        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon
                name="account_balance_wallet"
                className="text-white text-xl"
              />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Fintracker
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 text-left">
            Personal Finance Tracker.
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed text-left mb-6">
            A full-stack web application built from scratch to demonstrate
            architectural design, UI/UX implementation, and robust state
            management.
          </p>
        </div>

        <div className="space-y-4 relative z-10 mb-6">
          {[
            {
              icon: 'school',
              text: 'Developed entirely as a capstone learning project.',
            },
            {
              icon: 'code',
              text: 'Clean architecture with scalable patterns.',
            },
            {
              icon: 'devices',
              text: 'Fully responsive design for all screen sizes.',
            },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon
                  name={f.icon as IconName}
                  className="text-white text-base"
                />
              </div>
              <p className="text-sm text-blue-100">{f.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-blue-300 relative z-10 text-left">
          © {new Date().getFullYear()} FinTracker. Built for learning purposes.
        </p>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Icon
                name="account_balance_wallet"
                className="text-white text-lg"
              />
            </div>
            <span className="text-xl font-bold text-primary dark:text-primary-dark tracking-tight">
              Fintracker
            </span>
          </div>

          {/* Header & Para */}
          <div>
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Welcome back
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Log In to your account to continue.
            </p>
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-750 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Icon name="refresh" spin className="text-gray-400 text-base" />
            ) : (
              <Icon name="google" className="w-5 h-5 flex-shrink-0" />
            )}
            Log In with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
              or
            </span>
            <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
          </div>

          {/* Global error */}
          {globalError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg animate-[fadeIn_0.2s_ease]">
              <Icon name="error_outline" className="text-red-500 text-base" />
              <p className="text-sm text-red-700 dark:text-red-300">
                {globalError}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email field */}
            <FormInput
              id="login-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              icon="mail"
              placeholder="name@example.com"
              error={emailError}
            />

            {/* Password field */}
            <FormInput
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              icon="lock"
              placeholder="••••••••"
              error={passwordError}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark text-lg transition-colors"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-premium hover:shadow-premium-hover transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Icon name="refresh" spin className="text-base" />}
              {loading ? 'Logging In…' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
