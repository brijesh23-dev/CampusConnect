import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdAdd,
  MdArrowForward,
  MdErrorOutline,
  MdGroups,
  MdOutlineEmail,
  MdOutlineEventAvailable,
  MdOutlineNotificationsNone,
  MdPersonOutline,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { loginUser } from "../../redux/authSlice";
import { loginSchema } from "../../utilities/validation";

const features = [
  {
    icon: MdOutlineEventAvailable,
    text: "Find campus events that match your interests",
  },
  {
    icon: MdGroups,
    text: "Discover student clubs and communities",
  },
  {
    icon: MdOutlineNotificationsNone,
    text: "Keep up with registrations and event updates",
  },
];

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
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
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5fa] px-4 py-5 dark:bg-[#10131c] sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_28px_80px_-32px_rgba(34,27,82,0.32)] dark:bg-[#191d29] lg:min-h-[680px]">
        <aside className="relative hidden w-[43%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#30276d] via-[#403584] to-[#51419b] p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-52 -left-36 h-[30rem] w-[30rem] rounded-full border border-white/10"
          />

          <Link
            to="/"
            className="relative inline-flex w-fit items-center gap-3 rounded-md text-white"
            aria-label="CampusConnect home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <MdAdd className="text-3xl" aria-hidden="true" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.02em]">
              CampusConnect
            </span>
          </Link>

          <div className="relative max-w-md py-12">
            <h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.03em] xl:text-[2.8rem]">
              Make more of campus.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-violet-100">
              Find the events, clubs, and people that make your campus feel
              like yours.
            </p>

            <ul className="mt-10 space-y-5">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-100">
                    <Icon className="text-xl" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-6 text-violet-50">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-xs tracking-wide text-violet-200">
            Your campus community, all in one place.
          </p>
        </aside>

        <section className="flex flex-1 items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-9 inline-flex items-center gap-2.5 rounded-md text-[#393078] dark:text-violet-300 lg:hidden"
              aria-label="CampusConnect home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eeeafd] dark:bg-violet-400/15">
                <MdAdd className="text-2xl" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-[-0.02em]">
                CampusConnect
              </span>
            </Link>

            <header className="mb-8">
              <h2 className="text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] text-[#1f2030] dark:text-white sm:text-3xl">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#707184] dark:text-slate-300">
                Sign in to continue to CampusConnect.
              </p>
            </header>

            <div
              className="mb-7 grid grid-cols-2 rounded-xl bg-[#f1f1f6] p-1 dark:bg-[#252938]"
              role="group"
              aria-label="Choose account type"
            >
              {["student", "club"].map((tab) => {
                const Icon = tab === "student" ? MdPersonOutline : MdGroups;
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={isActive}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white text-[#30276d] shadow-sm dark:bg-[#373b4d] dark:text-violet-200"
                        : "text-[#737386] hover:text-[#30276d] dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="text-lg" aria-hidden="true" />
                    {tab === "club" ? "Club Admin" : "Student"}
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-[#343446] dark:text-slate-100"
                >
                  College email
                </label>
                <div
                  className={`flex min-h-12 items-center gap-3 rounded-xl bg-white px-3.5 transition-colors dark:bg-[#202432] ${
                    errors.email
                      ? "ring-1 ring-red-400"
                      : "ring-1 ring-[#dedee8] focus-within:ring-1 focus-within:ring-[#7668cb] dark:ring-[#3c4152] dark:focus-within:ring-violet-400"
                  }`}
                >
                  <MdOutlineEmail
                    className="shrink-0 text-lg text-[#8a8b9b] dark:text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    id="login-email"
                    autoComplete="email"
                    placeholder="name@university.edu"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    {...register("email")}
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#242536] outline-none placeholder:text-[#747482] dark:text-white dark:placeholder:text-slate-300"
                  />
                </div>
                {errors.email && (
                  <p
                    id="login-email-error"
                    className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-[#343446] dark:text-slate-100"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="rounded-sm text-xs font-medium text-[#51449b] underline-offset-4 hover:underline dark:text-violet-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div
                  className={`flex min-h-12 items-center gap-3 rounded-xl bg-white px-3.5 transition-colors dark:bg-[#202432] ${
                    errors.password
                      ? "ring-1 ring-red-400"
                      : "ring-1 ring-[#dedee8] focus-within:ring-1 focus-within:ring-[#7668cb] dark:ring-[#3c4152] dark:focus-within:ring-violet-400"
                  }`}
                >
                  <RiLockPasswordLine
                    className="shrink-0 text-lg text-[#8a8b9b] dark:text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "login-password-error" : undefined
                    }
                    {...register("password")}
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#242536] outline-none placeholder:text-[#747482] dark:text-white dark:placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="rounded-sm text-[#858596] transition-colors hover:text-[#393078] dark:text-slate-400 dark:hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <HiEyeOff className="text-lg" aria-hidden="true" />
                    ) : (
                      <HiEye className="text-lg" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="login-password-error"
                    className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 text-sm text-[#656579] dark:text-slate-300">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 cursor-pointer rounded border-[#c9c9d5] accent-[#51449b] focus-visible:outline-offset-2 dark:border-slate-500"
                />
                Remember this device for 30 days
              </label>

              {loginError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
                >
                  <MdErrorOutline
                    className="mt-0.5 shrink-0 text-lg"
                    aria-hidden="true"
                  />
                  <p className="leading-5">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                id="login-submit"
                disabled={isSubmitting}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#443782] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(49,39,109,0.8)] transition-colors hover:bg-[#382d71] disabled:cursor-wait disabled:opacity-65"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/90 border-t-transparent" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <MdArrowForward className="text-lg" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#777789] dark:text-slate-300">
              New to CampusConnect?{" "}
              <Link
                to="/register"
                className="rounded-sm font-semibold text-[#51449b] underline-offset-4 hover:underline dark:text-violet-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
