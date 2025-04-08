"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const AuthForm: React.FC = () => {
  return (
    <div className="grid h-screen place-items-center overflow-hidden bg-black text-zinc-200">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg px-4 sm:px-0"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5)] sm:p-12">
          <Logo />
          <Header />
          <LoginForm />
          <TermsAndConditions />
        </div>
      </motion.div>
      <BackgroundDecoration />
    </div>
  )
}

const BackButton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className="absolute left-4 top-4 sm:left-8 sm:top-8"
  >
    <SocialButton icon={<ChevronLeft size={16} />}>Go back</SocialButton>
  </motion.div>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`relative rounded-xl bg-zinc-100 px-6 py-3 text-lg font-medium text-black
    shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-300 
    hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] 
    active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Logo: React.FC = () => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mb-10 flex justify-center items-center"
  >
    <div className="relative">
      <img
        src="https://svgl.app/library/tailwindcss.svg"
        alt="Logoipsum"
        className="h-12 w-12"
      />
    </div>
    <span className="ml-4 text-3xl font-bold text-white">
      SDGP-Connect
    </span>
  </motion.div>
)

const Header: React.FC = () => (
  <div className="mb-10 text-center">
    <h1 className="text-4xl font-bold text-white">Welcome back</h1>
    <p className="mt-3 text-lg text-zinc-400">Sign in to your account to continue</p>
  </div>
)

const SocialButton: React.FC<{
  icon?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
}> = ({ icon, children, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 rounded-xl 
    border border-zinc-800 bg-zinc-900 px-4 py-2.5 font-medium text-zinc-200
    transition-all duration-300 hover:bg-zinc-800 active:scale-95"
  >
    {icon && <span className="text-zinc-400">{icon}</span>}
    <span>{children}</span>
  </button>
)

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showForgotMessage, setShowForgotMessage] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during sign in");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400"
        >
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-red-400" />
            {error}
          </p>
        </motion.div>
      )}
      {showForgotMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-zinc-800 p-4 text-sm text-zinc-300"
        >
          <p>Please contact your administrator to reset your password.</p>
        </motion.div>
      )}
      <div className="space-y-2">
        <label
          htmlFor="email-input"
          className="block text-sm font-medium text-zinc-300"
        >
          Email address
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="info@psycodelabs.lk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 
          bg-zinc-800 px-4 py-3 text-zinc-200
          placeholder-zinc-500 transition-all duration-300 
          hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password-input"
            className="block text-sm font-medium text-zinc-300"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowForgotMessage(true)}
            className="text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 
          bg-zinc-800 px-4 py-3 text-zinc-200
          placeholder-zinc-500 transition-all duration-300 
          hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}

const TermsAndConditions: React.FC = () => (
  <p className="mt-10 text-center text-sm text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="font-medium text-zinc-300 hover:text-white transition-colors">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="font-medium text-zinc-300 hover:text-white transition-colors">
      Privacy Policy
    </a>
    .
  </p>
)

const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#18181b,transparent)]" />
  )
}

export default AuthForm