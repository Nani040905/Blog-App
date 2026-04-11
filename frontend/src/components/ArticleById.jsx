import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../stores/authStore";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function ArticleById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch article
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await axios.get(
          `http://localhost:3000/common-api/articles/${id}`,
          { withCredentials: true }
        );
        setArticle(res.data.payload);
      } catch (err) {
        // console.log(err);
        setError(err.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  // Add comment (USER role only)
  const onAddComment = async (data) => {
    setCommentLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:3000/user-api/articles",
        {
          articleId: id,
          user: currentUser._id,
          comment: data.comment,
        },
        { withCredentials: true }
      );
      // Update article with new comments
      setArticle(res.data.payload);
      reset();
      toast.success("Comment added!");
    } catch (err) {
      // console.log(err);
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading article...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-700 mb-6 inline-flex items-center gap-1 cursor-pointer"
        >
          ← Back
        </button>

        {/* Article Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Category badge */}
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold mt-4 mb-3 text-gray-900">
            {article.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
            {article.author?.profileImageUrl && (
              <img
                src={article.author.profileImageUrl}
                alt={article.author.firstName}
                className="w-8 h-8 rounded-full object-cover border"
              />
            )}
            <span className="font-medium text-gray-700">
              {article.author?.firstName} {article.author?.lastName || ""}
            </span>
            <span>•</span>
            <span>{new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>

          {/* Divider */}
          <hr className="mb-6 border-gray-200" />

          {/* Content */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base mb-8">
            {article.content}
          </div>

          {/* Edit button for author */}
          {currentUser?.role === "AUTHOR" && currentUser._id === article.author?._id && (
            <div className="mt-6 flex justify-end">
              <Link
                to={`/edit-article/${id}`}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition shadow"
              >
                Edit Article
              </Link>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Comments ({article.comments?.length || 0})
          </h2>

          {/* Comment list */}
          {article.comments && article.comments.length > 0 ? (
            <div className="space-y-4 mb-6">
              {article.comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {c.user?.profileImageUrl && (
                      <img
                        src={c.user.profileImageUrl}
                        alt={c.user.firstName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-semibold text-gray-800">
                      {c.user?.firstName || "Anonymous"}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm ml-8">{c.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mb-6">
              No comments yet. Be the first to comment!
            </p>
          )}

          {/* Add comment form (only for USER role) */}
          {currentUser?.role === "USER" && (
            <form onSubmit={handleSubmit(onAddComment)}>
              <div className="mb-3">
                <textarea
                  rows="3"
                  placeholder="Write a comment..."
                  className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  {...register("comment", {
                    required: "Comment cannot be empty",
                    minLength: {
                      value: 2,
                      message: "Comment must be at least 2 characters",
                    },
                  })}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={commentLoading}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {commentLoading ? "Posting..." : "Post Comment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleById;