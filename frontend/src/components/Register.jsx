import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate } from "react-router";
import axios from 'axios'
import {errorClass, loadingClass} from '../styles/common.js'


export default function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);  
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)

  const onSubmit = async (newUser) => {
    setLoading(true);
		// Create form data object
    const formData = new FormData();
    //get user object
    let { role, profileImageUrl, ...userObj } = newUser;
		
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
    	formData.append(key, userObj[key]);
  	});
    // add profilePic to Formdata object
    formData.append("profileImageUrl", profileImageUrl[0]);
    try {
      if (role === "USER"){
        // make request to user-api
        let resObj = await axios.post("http://localhost:3000/user-api/users",formData)
        let res = resObj.data;
        navigate('/login')
      }
      if (role === "AUTHOR"){
        // make request to author-api
        let {role,...userObj} = newUser;
        // make request to user-api
        let resObj = await axios.post("http://localhost:3000/author-api/users",formData)
        let res = resObj.data;
        navigate('/login')
      }
    } catch (err) {
			// console.log(err)
      setError(err.response?.data?.error || "Registration failed")
    }
    finally{
      setLoading(false)
    }

  };

  const onSelectImage =(e) => {
    //get image file
    const file = e.target.files[0];
    // validation for image format
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG or PNG allowed");
        return;
      }
      //validation for file size
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }
      //Converts file → temporary browser URL(create preview URL)
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setError(null);
    }
  }

	useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
    
  if (loading === true){
    return <p className={loadingClass}></p>
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 select-none">

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-102">
          <h2 className="text-2xl font-bold mb-6 text-center"> Register </h2>
          <div className="mb-4">
            {
              error ? <p className={errorClass}>{error}</p>:<p></p>
            }
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium"> First Name </label>
            <input type="text" className="w-full border rounded p-2" {...register("firstName", { required:true, minLength:2})} />
            { errors?.firstName?.type=="required" && <p className="text-red-500 text-sm mt-1">First name is required</p> }
            {errors?.firstName?.type == "minLength" && <p className="text-red-500 text-sm mt-1">First name must be at least 2 characters</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium"> Last Name </label>
            <input type="text" className="w-full border rounded p-2" {...register("lastName")}/>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium"> Email </label>
            <input type="text" className="w-full border rounded p-2" {...register("email", { required:true, pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/})} />
            { errors?.email?.type=="required" && <p className="text-red-500 text-sm mt-1">Email is required</p> }
            { errors?.email?.type=="pattern" && <p className="text-red-500 text-sm mt-1">Invalid email address</p> }
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium"> Password </label>
            <input type="password" className="w-full border rounded p-2" {...register("password", { required:true, minLength:6 })} />
            {errors?.password?.type =="required" && <p className="text-red-500 text-sm mt-1"> Password is required </p> }
            {errors?.password?.type =="minLength" && <p className="text-red-500 text-sm mt-1"> Password must be at least 6 characters </p> }
          </div>
          {/* Profile Picture */}
          <div className="mb-4">
            <label className=" block mb-1 font-medium"> Profile Picture </label>

            <div className=" gap-2">

              {/* Image URL 
              <input type="url" placeholder="Enter image URL" className="w-3/4 border rounded p-2" {...register("profileImageUrl")} /> */}

              {/* Upload Image */}
              <input type="file" accept="image/png, image/jpeg"  className="w-full border rounded p-2 cursor-pointer" {...register("profileImageUrl")} onChange={onSelectImage}/>
              {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
            </div>
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block mb-2 font-medium"> Role </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="USER" {...register("role", { required:true })} />
                User
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="AUTHOR" {...register("role",{ required:true })} />
                Author
              </label>
            </div>
            {errors?.role?.type=="required" && <p className="text-red-500 text-sm mt-1"> Role is required </p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 mb-4 text-white p-2 rounded hover:bg-blue-700 hover:cursor-pointer" > Register </button>
          <div className="">
            <p>Already have an account? <NavLink to="/login" className="text-blue-400">Login</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
}