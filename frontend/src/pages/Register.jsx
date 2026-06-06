import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import {registerSchema} from "../utilities/validation";
import { registerUser } from "../redux/authSlice";

function Register() {
  const { register, handleSubmit,formState:{errors} } = useForm({
      zodResolver: zodResolver(registerSchema),    
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error,loading,user}  = useSelector((state)=>state.auth);
console.log("user",user)
  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data)).unwrap();
    console.log('response',res)
    if(res.role==='student' ){
      navigate("/student/dashboard");
    }else if(res.role==='club'){
      navigate("/club/dashboard");
    }else{
      navigate("/admin/dashboard");
    }
    // if(){
    //   if (res.role === "student") {
    //     navigate("/student/dashboard");
    //   } else if (res.role === "club") {
    //     navigate("/club/dashboard");
    //   } else {
    //     navigate("/admin/dashboard");
    //   }
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      {
        loading&&<h1>loading...</h1>
      }
      {error&&<p>{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input

          placeholder="Full Name"
          {...register("name")}
          className="w-full border p-3 rounded-lg mb-4"
        />
        {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 rounded-lg mb-4"
        />
        {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 rounded-lg mb-4"
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

        <select
          {...register("role")}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="student">Student</option>
          <option value="club">Club</option>
          <option value="admin">admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mb-4">{errors.role.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
        >
          Register
        </button>


        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;