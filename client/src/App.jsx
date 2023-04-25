import { useState, useEffect } from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import axios from 'axios'
import Blog from './components/Blog'
import ProctectedRoutes from './components/ProctectedRoutes'
import RootLayout from './layouts/RootLayout'



function App() {

  const [user, setUser] = useState(null)
  
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {"Authorization": `Bearer ${localStorage.getItem('jwt')}`}
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await 
        client.get('/me')
        .then(
          (response) => {
            localStorage.setItem('user', JSON.stringify(response.data.body.user))
            setUser(response.data.body.user)
          }
        )
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])
  
  


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout user={user} setUser={setUser} />} >
        <Route path="/" element={<Blog />} />
        <Route path="login" element={<LoginForm setUser={setUser} />} />
        <Route path="signup" element={<SignupForm />} />
        <Route  element={<ProctectedRoutes />} >
          {/* add routes that require user to be logged in */}
          

        </Route>

      </ Route >
    )
  )



  return (
   <RouterProvider router={router} />
  )
}

export default App
