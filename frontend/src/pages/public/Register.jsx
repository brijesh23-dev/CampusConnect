import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utilities/validation";
import { registerUser } from "../../redux/authSlice";
import { useState } from "react";
import { MdOutlineEmail, MdPerson, MdErrorOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState("student");
  const [submitError, setSubmitError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else if (res.role === "club") {
        navigate("/clubs");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setSubmitError(
        typeof error === "string"
          ? error
          : "Registration failed. Please check your details and try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-blue-500 to-indigo-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800')] bg-cover bg-center opacity-15" />
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo */}
          <div>
            <Link to="/">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                CampusConnect
              </h1>
            </Link>
            <p className="text-violet-100 mt-3 text-base leading-relaxed max-w-xs">
              Join thousands of students already discovering events, clubs, and
              campus life — all in one place.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-5 my-auto py-10">
            {[
              { step: "01", title: "Create your account", desc: "Pick your role and sign up in seconds." },
              { step: "02", title: "Set your interests", desc: "Tell us what you love so we can personalize your feed." },
              { step: "03", title: "Discover & join", desc: "Browse events and clubs tailored just for you." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                  {item.step}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-violet-200 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-white flex items-center justify-center text-xs font-black text-white"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">10,000+ students</p>
                <p className="text-violet-200 text-xs">already on CampusConnect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              CampusConnect
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="text-gray-500 mt-1.5">
              Get started — it only takes a minute.
            </p>
          </div>

          {/* Role selector */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { value: "student", label: "Student" },
              { value: "club", label: "Club Admin" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleRoleChange(tab.value)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeRole === tab.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
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
                or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Hidden role input (controlled via tab) */}
            <input type="hidden" {...register("role")} />

            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div
                className={`flex items-center border rounded-xl px-3 py-3 bg-white transition-all ${
                  errors.name
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <MdPerson className="text-gray-400 text-lg flex-shrink-0 mr-2" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder={activeRole === "club" ? "Club / Organisation name" : "Your full name"}
                  {...register("name")}
                  className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                  id="reg-email"
                  type="email"
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
              <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div
                className={`flex items-center border rounded-xl px-3 py-3 bg-white transition-all ${
                  errors.password
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <RiLockPasswordLine className="text-gray-400 text-lg flex-shrink-0 mr-2" />
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
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
            {submitError && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
                <MdErrorOutline className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-600 font-medium leading-relaxed">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              id="register-submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                `Create ${activeRole === "club" ? "Club" : "Student"} Account`
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            By creating an account, you agree to our{" "}
            <span className="text-gray-500 font-medium">Terms of Service</span>{" "}
            and{" "}
            <span className="text-gray-500 font-medium">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
