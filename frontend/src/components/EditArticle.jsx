import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { errorClass, loadingClass } from "../styles/common.js";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch article data on load
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/common-api/articles/${id}`,
          { withCredentials: true }
        );
        const article = res.data.payload;
        
        // Populate form fields
        setValue("title", article.title);
        setValue("category", article.category);
        setValue("content", article.content);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load article");
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    try {
      // Backend expects: articleId, title, content, category, author
      const updateObj = { 
        ...data, 
        articleId: id,
        author: currentUser._id 
      };

      await axios.put(
        "http://localhost:3000/author-api/articles",
        updateObj,
        { withCredentials: true }
      );

      toast.success("Article updated successfully!");
      navigate(`/article/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update article");
      toast.error(err.response?.data?.message || "Failed to update article");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className={loadingClass}>Loading article details...</p>;
  }

  if (error && !submitting) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <p className={errorClass}>{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Article</h2>

        {/* Error Message */}
        {error && <p className={`${errorClass} mb-4`}>{error}</p>}

        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
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
          <label className="block font-medium mb-1 text-gray-700">Category</label>
          <select
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="AI">AI</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <textarea
            rows="10"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            {...register("content", { 
              required: "Content is required", 
              minLength: {
                value: 20,
                message: "Content must be at least 20 characters"
              } 
            })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 transition"
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
