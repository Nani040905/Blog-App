import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { errorClass } from "../styles/common";
import { toast } from "react-hot-toast";

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = useAuth((state)=>state.login)
  const isAuthenticated = useAuth(state=>state.isAuthenticated)
  const currentUser = useAuth(state=>state.currentUser)
  const error = useAuth(state=>state.error)
  const navigate = useNavigate()


  const onSubmit = async (userCredObj) => {
    await login(userCredObj)
  };

  useEffect (()=>{
    if (isAuthenticated){
      if (currentUser.role === "USER"){
        toast.success("Login successful")
        navigate("/user-dashboard");
      }
      if (currentUser.role === "AUTHOR"){
        toast.success("Login successful")
        navigate("/author-dashboard");
      }
      if (currentUser.role === "ADMIN"){
        toast.success("Login successful")
        navigate("/admin-dashboard");
      }
    }
  },[isAuthenticated,currentUser])

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-100" >
        <h2 className="text-2xl font-bold mb-6 text-center"> Login </h2>
        <div className="mb-4">
          {
            error ? <p className={errorClass}>{error}</p>:<p></p>
          }
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium"> Email </label>
          <input type="text" className="w-full border rounded p-2" {...register("email", { required:true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} />
          {errors?.email?.type == "required" && <p className="text-red-500 text-sm mt-1"> Email is required </p> }
          {errors?.email?.type == "pattern" && <p className="text-red-500 text-sm mt-1"> Invalid email format </p> }
        </div>
        {/* Password */}
        <div className="mb-8">
          <label className="block mb-1 font-medium"> Password </label>
          <input type="password" className="w-full border rounded p-2" {...register("password", { required:true })} />
          {errors?.password?.type == "required" && <p className="text-red-500 text-sm mt-1"> Password is required </p> }
        </div>
        <button type="submit" className="w-full mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700" > Login </button>
        <div className="">
          <p>New Here? <NavLink to="/register" className="text-blue-400">Register</NavLink></p>
        </div>
      </form>
    </div>
  );
}