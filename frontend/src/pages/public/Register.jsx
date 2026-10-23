import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-10 sm:px-6   dark:bg-[#10131c]">
      <div className="w-full max-w-md ">
          <Link
            to="/"
            className="mb-7 inline-flex items-center text-lg font-semibold tracking-[-0.02em] text-blue-700 dark:text-violet-300"
          >
            CampusConnect
          </Link>

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

          <p className="mb-6 text-sm leading-6 text-gray-600">
            Create your campus account with your email and a secure password.
          </p>

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
                  className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent "
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
  );
}

export default Register;
