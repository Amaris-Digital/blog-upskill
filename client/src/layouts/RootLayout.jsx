import React from 'react'
import { Link } from 'react-router-dom'
import { TfiWrite } from 'react-icons/tfi'


// add navbar and footer here
// outlets
import { Outlet } from 'react-router-dom'

export default function RootLayout({user, setUser}) {

  const handleLogout = () => {
    console.log('logout')
    console.log(user)
    localStorage.clear()
    setUser(null)
  }

  return (
    <div className='bg-slate-100'>
      <div className='bg-red-700 fixed top-0 left-0 right-0 flex items-center justify-around h-12 '>
        <span className='font-login'>supeRails</span>
        <div>
          <ul className='flex  items-center space-x-3 text-2xl'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/' className='flex '>
                <TfiWrite /> Write
              </Link>
            </li>
            <li>
              {user ?  (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>

  )
}
