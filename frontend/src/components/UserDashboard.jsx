import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import axios from "axios";
import { toast } from "react-hot-toast";

function UserDashboard() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {

    async function getData() {

      setLoading(true);

      try {

        const res = await axios.get(
          "http://localhost:3000/user-api/articles",
          { withCredentials: true }
        );

        setArticles(res.data.payload);

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }
    }

    getData();

  }, []);

  const onLogout = async () => {
    await logout();
    toast.success("Logout successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6e6e73]">
        <p className="text-lg animate-pulse">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p className="text-lg">Failed to load articles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">Articles</h1>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#d2d2d7]">
            <p className="text-[#6e6e73]">No articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((obj) => (
              <div
                key={obj._id}
                className="bg-white p-7 rounded-2xl border border-[#d2d2d7] hover:border-[#0066cc] transition-all flex flex-col group"
              >
                <h2 className="text-xl font-bold text-[#1d1d1f] mb-3 leading-tight group-hover:text-[#0066cc] transition-colors">
                  {obj.title}
                </h2>
                <p className="text-[#6e6e73] mb-8 line-clamp-3 text-sm leading-relaxed">
                  {obj.content.slice(0, 150)}...
                </p>
                <div className="flex justify-between items-center mt-auto pt-5 border-t border-[#f5f5f7]">
                  <p className="text-[10px] text-[#a1a1a6] font-bold uppercase tracking-widest">
                    {new Date(obj.updatedAt).toLocaleDateString()}
                  </p>
                  <NavLink
                    to={`/article/${obj._id}`}
                    className="text-[#0066cc] text-sm font-semibold hover:underline"
                  >
                    Read More →
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;