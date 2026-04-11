import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import { Toaster } from 'react-hot-toast'

import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import EditArticle from './components/EditArticle'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import ArticleById from './components/ArticleById'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorised'
import ErrorBoundary from './components/ErrorBoundary'

import ProfileContainer from './components/profiles/ProfileContainer'

function App() {
  
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      errorElement:<ErrorBoundary />,
      children:[
        {
          path:"",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/profile",
          element:
          <ProtectedRoute allowedRoles={['USER', 'AUTHOR', 'ADMIN']}>
            <ProfileContainer />
          </ProtectedRoute>
        },
        {
          path:"/add-article",
          element:
          <ProtectedRoute allowedRoles={['AUTHOR']}>
            <AddArticle />
          </ProtectedRoute>
        },
        {
          path: "/user-dashboard",
          element:
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
        },
        {
          path: "/admin-dashboard",
          element:
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
        },
        {
          path: "/author-dashboard",
          element:
            <ProtectedRoute allowedRoles={['AUTHOR']}>
              <AuthorDashboard />
            </ProtectedRoute>
        },
        {
          path:`/article/:id`,
          element:
          <ProtectedRoute allowedRoles={['AUTHOR','USER']}>
              <ArticleById />
            </ProtectedRoute>
          
        },
        {
          path: "/edit-article/:id",
          element:
            <ProtectedRoute allowedRoles={['AUTHOR']}>
              <EditArticle />
            </ProtectedRoute>
        },
        {
          path: '/unauthorized',
          element: <Unauthorized />
        },
      ]
    }
  ])

  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <RouterProvider router={routerObj} />

  </>)
}

export default App