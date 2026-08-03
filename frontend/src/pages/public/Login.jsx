import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utilities/validation";
import { loginUser } from "../../redux/authSlice";
import { MdOutlineEmail, MdErrorOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      reset();
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else if (res.role === "club") {
        navigate("/clubs");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setLoginError(
        typeof error === "string"
          ? error
          : "Invalid credentials. Please check your email and password."
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-violet-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo */}
          <div>
            <Link to="/">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                CampusConnect
              </h1>
            </Link>
            <p className="text-blue-100 mt-3 text-base leading-relaxed max-w-xs">
              Connect with your campus. Discover events, join clubs, and manage
              your academic social life in one place.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4 my-auto py-10">
            {[
              "Discover campus events tailored to your interests",
              "Join clubs and build meaningful connections",
              "Get real-time notifications and RSVP instantly",
              "Track your event history and memberships",
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-sm">
                ★
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  "The heart of student life."
                </p>
                <p className="text-blue-100 text-xs">Join 10,000+ active students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              CampusConnect
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-1.5">
              Sign in to access your{" "}
              {activeTab === "club" ? "club admin" : "student"} dashboard.
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["student", "club"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "club" ? "Club Admin" : "Student"}
              </button>
            ))}
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/473731/microsoft.svg"
                alt="Microsoft"
                className="w-5 h-5"
              />
              Continue with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                College Email
              </label>
              <div
                className={`flex items-center border rounded-xl px-3 py-3 bg-white transition-all ${
                  errors.email
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <MdOutlineEmail className="text-gray-400 text-lg flex-shrink-0 mr-2" />
                <input
                  type="email"
                  id="login-email"
                  placeholder="name@university.edu"
                  {...register("email")}
                  className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-blue-600 font-medium hover:underline">
                  Forgot?
                </Link>
              </div>
              <div
                className={`flex items-center border rounded-xl px-3 py-3 bg-white transition-all ${
                  errors.password
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <RiLockPasswordLine className="text-gray-400 text-lg flex-shrink-0 mr-2" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-400 hover:text-gray-600 transition ml-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* API Error Banner */}
            {loginError && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
                <MdErrorOutline className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-600 font-medium leading-relaxed">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              id="login-submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
