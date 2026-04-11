import React from 'react'
import { useAuth } from "../stores/authStore"
import { useNavigate } from "react-router"
import { toast } from "react-hot-toast"

function AdminDashboard() {
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout()
    toast.success("Admin Logout successfully")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">Admin Dashboard</h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl border border-[#d2d2d7] shadow-sm">
             <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">User Statistics</h3>
             <p className="text-[#6e6e73] mb-6 text-sm">Monitor and manage all user accounts in the system.</p>
             <div className="bg-[#f5f5f7] p-6 rounded-xl border border-[#eeeef2]">
                <p className="text-3xl font-black text-[#1d1d1f]">1,284</p>
                <p className="text-[10px] text-[#a1a1a6] font-bold uppercase tracking-widest mt-1">Total Active Users</p>
             </div>
          </div>

          <div className="bg-white p-10 rounded-2xl border border-[#d2d2d7] shadow-sm">
             <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">Content Moderation</h3>
             <p className="text-[#6e6e73] mb-6 text-sm">Review and manage articles across the platform.</p>
             <div className="bg-[#f5f5f7] p-6 rounded-xl border border-[#eeeef2]">
                <p className="text-3xl font-black text-[#1d1d1f]">42</p>
                <p className="text-[10px] text-[#a1a1a6] font-bold uppercase tracking-widest mt-1">Pending Reviews</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard