import React from 'react'
import Nav from './navbar'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Nav />
        <main className='flex-1 pt-20'>
            <Outlet />
        </main>
        <Footer />      
    </div>
  )
}

export default Layout
