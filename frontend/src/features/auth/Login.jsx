import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utilities/validation";
import { loginUser } from "../../redux/authSlice";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    esolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else {
        //navigate("/club/dashboard");
        navigate("/club");
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  w-full ">
      {/*form-card*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px] h-[600px] flex flex-col gap-3 "
      >
        <div className="flex flex-col my-5">
          <h1 className=" mx-auto w-full text-4xl font-bold text-center font-Inter py-3 tracking-tighter text-blue-800">
            Welcome <br></br>to <span className="italic">campusconnect</span>
          </h1>
          <span className=" mx-auto  text-xl font-semibold tracking-normal  text-center font-Poppins text-neutral-700">
            where campus culture meets your calender
          </span>
        </div>
        <div>
          <div>
            <label htmlFor="email" className="">
              email
            </label>
          </div>
          <div className="flex items-center w-full border p-3 rounded-lg mb-4 outline-none focus-within:ring-2 focus-within:ring-blue-600 ">
            <span className="text-neutral-500">
              <MdOutlineEmail />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="student@college.edu"
              {...register("email")}
              className="selection:none w-full border-none focus:ring-0 focus:outline-none ml-2"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm mb-4">
              {errors.email?.message}
            </span>
          )}
          <div>
            <label htmlFor="password" className="">
              password
            </label>
          </div>
          <div className="flex items-center w-full border p-3 rounded-lg mb-4 outline-none focus-within:ring-2 focus-within:ring-blue-600 "  >
            <span className="text-neutral-500">
              <RiLockPasswordLine />
            </span>
            <input
            id="password"
              type="password"
              name="password"
              placeholder="*************"
              {...register("password")}
              className="selection:none w-full border-none focus:ring-0 focus:outline-none ml-2 "
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mb-4">
              {errors.password?.message}
            </span>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg placeholder: hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>

    // <div className="flex justify-center items-center min-h-screen px-4">
    //   <div  className=" mx-auto flex flex-row justify-center shadow-xl max-w-4xl  bg-white h-[550px] rounded-2xl overflow-hidden divide-x-2">
    //   <div  className=" flex-1 ">
    //     <img  src="https://images.pexels.com/photos/6209364/pexels-photo-6209364.jpeg" className="object-cover object-left-top w-[400px] rounded-lg" ></img>
    //   </div>
    //   <div className="flex-1  flex  items-center justify-center">
    //      <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     noValidate
    //     className="w-[350px] h-[600px] flex flex-col gap-6 p-4saa"
    //   >
    //     <div>
    //       <h1 className=" mx-auto w-full text-2xl font-bold text-center font-Inter py-3 text-blue-800" >
    //         Welcome to campusconnect
    //       </h1>
    //       <span className=" mx-auto  text-sm font-bold text-center font-Poppins ">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
    //         odit.
    //       </span>
    //     </div>
    //     <div>
    //       <label htmlFor="email" className="">
    //         email
    //       </label>
    //       <div className="flex items-center w-full border p-3 rounded-lg mb-4 outline-none focus-within:ring-2 focus-within:ring-blue-600 ">
    //         <span className="text-neutral-500">
    //           <MdOutlineEmail />
    //         </span>
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           placeholder="student@college.edu"
    //           {...register("email")}
    //           className="selection:none w-full border-none focus:ring-0 focus:outline-none ml-2"
    //         />
    //       </div>
    //       {errors.email && (
    //         <span className="text-red-500 text-sm mb-4">
    //           {errors.email?.message}
    //         </span>
    //       )}
    //       <div className="flex items-center w-full border p-3 rounded-lg mb-4 outline-none focus-within:ring-2 focus-within:ring-blue-600 ">
    //         <span className="text-neutral-500">
    //           <RiLockPasswordLine />
    //         </span>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="*************"
    //           {...register("password")}
    //           className="selection:none w-full border-none focus:ring-0 focus:outline-none ml-2 "
    //         />
    //       </div>
    //       {errors.password && (
    //         <span className="text-red-500 text-sm mb-4">
    //           {errors.password?.message}
    //         </span>
    //       )}
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white py-3 rounded-lg placeholder: hover:bg-blue-700 transition"
    //       >
    //         Login
    //       </button>
    //     </div>
    //   </form>
    //   </div>
    // </div>
    // </div>
  );
}

export default Login;
