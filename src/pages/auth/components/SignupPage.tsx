import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '@/shared/components/FormInput';
import Icon from '@/shared/components/Icon';
import { useSignup } from '../hooks/useSignup';

const SignupPage = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    errors,
    globalError,
    loading,
    googleLoading,
    strength,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    handleGoogleSignUp,
    validators,
  } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 bg-primary p-12 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-8 -right-16 w-72 h-72 rounded-full bg-white/5" />

        <div>
          <div className="flex items-center gap-3 mb-10">
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
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4 text-left">
            A comprehensive student project.
          </h2>
          <p className="text-blue-200 leading-relaxed text-left">
            Built to explore modern web technologies, React, and Firebase while creating a useful tool for personal finance management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {[
            { value: 'React', label: 'Frontend Library' },
            { value: 'Vite', label: 'Build Tool' },
            { value: 'Firebase', label: 'Backend as a Service' },
            { value: 'Tailwind', label: 'CSS Framework' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-blue-200 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-blue-300 relative z-10 text-left">
          © {new Date().getFullYear()} FinTracker. Built for learning purposes.
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-5 py-6">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2">
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

          {/* Heading & Para */}
          <div>
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Create your account
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Start managing your finances smarter today.
            </p>
          </div>

          {/* Google sign-up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-750 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Icon name="refresh" spin className="text-gray-400 text-base" />
            ) : (
              <Icon name="google" className="w-5 h-5 flex-shrink-0" />
            )}
            Sign up with Google
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
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <Icon
                name="error_outline"
                className="text-red-500 text-base flex-shrink-0"
              />
              <p className="text-sm text-red-700 dark:text-red-300">
                {globalError}
              </p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name field */}
            <FormInput
              id="signup-name"
              label="Full Name"
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={() => validators.name()}
              icon="person"
              placeholder="John Doe"
              error={errors.name}
            />

            {/* Email field */}
            <FormInput
              id="signup-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validators.email()}
              icon="mail"
              placeholder="name@example.com"
              error={errors.email}
            />

            {/* Password field */}
            <div>
              <FormInput
                id="signup-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validators.password()}
                icon="lock"
                placeholder="Min. 6 characters"
                error={errors.password}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    tabIndex={-1}
                    className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark text-lg transition-colors"
                  >
                    <Icon
                      name={showPassword ? 'visibility_off' : 'visibility'}
                    />
                  </button>
                }
              />
              {/* Password strength meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-gray-200 dark:bg-gray-700'}`}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p
                      className={`text-xs font-medium ${strength.score <= 1 ? 'text-red-500' : strength.score === 2 ? 'text-amber-500' : 'text-emerald-500'}`}
                    >
                      {strength.label}
                      {strength.score < 3 &&
                        ' — add uppercase, numbers & symbols'}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <FormInput
              id="signup-confirm-password"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => validators.confirmPassword()}
              icon="lock_reset"
              placeholder="••••••••"
              error={errors.confirmPassword}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  tabIndex={-1}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark text-lg transition-colors"
                >
                  <Icon
                    name={showConfirmPassword ? 'visibility_off' : 'visibility'}
                  />
                </button>
              }
            />

            {/* Password match indicator */}
            {confirmPassword && (
              <p
                className={`text-xs flex items-center gap-1 -mt-2 ${confirmPassword === password ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}
              >
                <Icon
                  name={
                    confirmPassword === password ? 'check_circle' : 'cancel'
                  }
                  className="text-xs"
                />
                {confirmPassword === password
                  ? 'Passwords match'
                  : 'Passwords do not match'}
              </p>
            )}



            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-premium hover:shadow-premium-hover transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Icon name="refresh" spin className="text-base" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          {/* Already Signed-up */}
          <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Log In
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 py-3 border-t border-border-light dark:border-border-dark">
            <Icon name="lock" className="text-gray-400 text-sm" />
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Your data is encrypted and never shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
