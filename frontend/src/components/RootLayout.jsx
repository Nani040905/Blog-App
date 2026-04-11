import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { useAuth } from '../stores/authStore'

function RootLayout() {
  const verifyAuth = useAuth((state)=>state.verifyAuth)
  const loading = useAuth((s)=>s.loading)
  useEffect(()=>{
    verifyAuth()
  },[])
  if (loading){
    return <p className='test-center nt-10'>Loading ....</p>
  }
  return (
    <div>
        <Header />
        <div className=''>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout