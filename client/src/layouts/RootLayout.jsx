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
    console.log(user)
    localStorage.clear()
    setUser(null)
    navigate('/')
    
  }

  return (
    <div className='bg-slate-100'>
      <div className='bg-red-700 fixed top-0 left-0 right-0 flex items-center justify-around h-12 '>
        <span className='font-login font-semibold text-yellow-400'>supeRails</span>
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
                <button className='hover:text-red-500  text-white bg-black rounded-lg p-1 text-sm font-extralight' onClick={handleLogout}>Logout</button>
              ) : (
                <Link className='hover:text-white ' to='/login'>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>

  )
}
