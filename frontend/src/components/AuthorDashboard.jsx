import React, { useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router'
import { useAuth } from "../stores/authStore";
import { toast } from 'react-hot-toast';
import axios from 'axios'

function AuthorDashboard() {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null); 
	const logout = useAuth((state)=>state.logout)
  const currentUser = useAuth(state=>state.currentUser)
  const navigate=useNavigate()

  useEffect (()=>{
    setLoading(true)
    async function getData(){
      try {
        let res = await axios.get(`http://localhost:3000/author-api/articles/${currentUser._id}`,{withCredentials:true})
        let articleObj=res.data.payload
        setArticles([...articleObj])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  },[])

  const onLogout=async ()=>{
    await logout()
		toast.success("Logout successfully")
    navigate('/login')
  }

  const deleteArticle = async (articleId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/author-api/articles/authorId/${currentUser._id}/articleId/${articleId}`,
        { withCredentials: true }
      );
      toast.success("Article deleted (soft)!");
      setArticles(prev => prev.map(a => a._id === articleId ? res.data.payload : a));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete article");
    }
  };

  const restoreArticle = async (articleId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/author-api/articles/authorId/${currentUser._id}/articleId/${articleId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Article restored!");
      setArticles(prev => prev.map(a => a._id === articleId ? res.data.payload : a));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to restore article");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6e6e73]">
        <p className="animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-[#f5f5f7] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">Your Articles</h1>
          <NavLink to="/add-article" className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#004499] transition-all">
            + New Article
          </NavLink>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((obj)=>(
            <div key={obj._id} className="bg-white p-7 rounded-2xl border border-[#d2d2d7] hover:border-[#0066cc] transition-all flex flex-col group" >

              <div className="flex justify-between items-center mb-4">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${obj.isArticleActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {obj.isArticleActive ? 'Active' : 'Deleted'}
                </span>
                <p className="text-[10px] text-[#a1a1a6] font-bold uppercase tracking-widest">
                  {new Date(obj.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <h2 className="text-lg font-bold mb-3 text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors line-clamp-2"> {obj.title} </h2>
              <p className="text-[#6e6e73] mb-8 line-clamp-2 text-sm leading-relaxed"> {obj.content} </p>

              <div className="flex gap-3 justify-between items-center mt-auto border-t border-[#f5f5f7] pt-5">
                <NavLink
                  to={`/article/${obj._id}`}
                  className="text-[#0066cc] text-xs font-bold hover:underline"
                >
                  View
                </NavLink>

                <div className="flex gap-2">
                  {obj.isArticleActive ? (
                      <button
                        onClick={() => deleteArticle(obj._id)}
                        className="text-red-500 text-xs font-bold hover:text-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                  ) : (
                    <button
                      onClick={() => restoreArticle(obj._id)}
                      className="text-green-600 text-xs font-bold hover:text-green-800 cursor-pointer"
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthorDashboard