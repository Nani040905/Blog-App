import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { errorClass, loadingClass } from "../styles/common.js";

export default function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Attach author ID from the logged-in user
      const articleObj = { ...data, author: currentUser._id };
      let res = await axios.post(
        "http://localhost:3000/author-api/articles",
        articleObj,
        { withCredentials: true }
      );
      toast.success("Article published successfully!");
      navigate("/author-dashboard");
    } catch (err) {
      // console.log(err)
      setError(err.response?.data?.message || "Failed to publish article");
      toast.error(err.response?.data?.message || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className={loadingClass}>Publishing your article...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-125"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Article</h2>

        {/* Error Message */}
        <div className="mb-4">
          {error && <p className={errorClass}>{error}</p>}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select
            className="w-full border rounded p-2"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="AI">AI</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
          {errors?.category?.type == "required" && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Content</label>
          <textarea
            rows="6"
            className="w-full border rounded p-2"
            {...register("content", { required: true, minLength: 20 })}
          />
          {errors?.content?.type == "required" && (
            <p className="text-red-500 text-sm mt-1">Content is required</p>
          )}
          {errors?.content?.type == "minLength" && (
            <p className="text-red-500 text-sm mt-1">
              Content must be at least 20 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Publish Article
        </button>
      </form>
    </div>
  );
}