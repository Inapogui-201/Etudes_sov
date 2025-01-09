import NavBar from '@/pages/admin/content/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
        </main>
      </div>
  )
}

export default AdminLayout