import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TfiWrite } from 'react-icons/tfi'


// add navbar and footer here
// outlets
import { Outlet } from 'react-router-dom'

export default function RootLayout({user, setUser}) {

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('logout')
    localStorage.clear()
    setUser(null)
    console.log(user)
    navigate('/login')
    
  }

  return (
    <div className='bg-slate-100'>
      <div className='bg-red-700 fixed top-0 left-0 right-0 flex items-center justify-around h-12 '>
        <Link to='/'>
          <span className='font-login font-semibold text-yellow-400'>supeRails</span>
        </Link>
        
        <div>
          <ul className='flex  items-center space-x-8 font-serif font-bold text-xl '>
            <li>
              <Link className='hover:text-white ' to='/'>Home</Link>
            </li>
            <li>
              <Link  to='/' className='flex hover:text-white items-center space-x-1 '>
                <span className='text-sm'><TfiWrite /></span>
                 Write
              </Link>
            </li>
            <li>
              {user ?  (
                <button className='hover:text-red-500 bg-black text-white rounded-md py-1 p-2 text-sm font-extralight ' onClick={handleLogout}>Logout</button>
              ) : (
                <Link className='hover:text-red-500 bg-black text-white rounded-md py-1 p-2 text-md font-extralight ' to='/login'>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>

  )
}
