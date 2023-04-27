import { useState, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import axios from 'axios'
import Blog, { blogsLoader } from './components/Blog'
import ProctectedRoutes from './components/ProctectedRoutes'
import RootLayout from './layouts/RootLayout'
import SingleBlog, { singleBlogLoader } from './components/SingleBlog'
import SingleCategoryPost, { singleCategoryPostLoader } from './components/SingleCategoryPost'
import Write, { createBlog } from './components/Write'




function App() {

  const [user, setUser] = useState(localStorage.getItem('user'))


  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.get('/me')
        console.log(`use effect ${JSON.stringify(response.data.body.user)}`)
        localStorage.setItem('user', JSON.stringify(response.data.body.user))
        setUser(response.data.body.user)
        console.log(user)

      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])




  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout user={user} setUser={setUser} />} >
        <Route path='/' element={<Blog />} loader={blogsLoader} />
        <Route path="login" element={<LoginForm setUser={setUser} />} />
        <Route path="signup" element={<SignupForm setUser={setUser} />} />
        <Route element={<ProctectedRoutes />} >
          {/* add routes that require user to be logged in */}
          <Route path="blogs/:id" element={<SingleBlog user={user} />} loader={singleBlogLoader} />
          <Route path="categories/:id" element={<SingleCategoryPost  />} loader={singleCategoryPostLoader} />
          <Route path='/create' element={< Write />} action={createBlog}  />
          
        </Route>

      </ Route >
    )
  )



  return (
    <RouterProvider router={router} />
  )
}

export default App
