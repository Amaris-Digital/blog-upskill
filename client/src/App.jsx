import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import axios from 'axios'
import Blog from './components/Blog'



function App() {

  const [jwtToken, setjwtToken ] = useState(localStorage.getItem('user'))

  const [user, setUser] = useState(null)
  
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {"Authorization": `Bearer ${jwtToken}`}
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.get('/me')
        setUser(response.data.body.user)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [jwtToken])
  
  if (!jwtToken) {
    return (
      <LoginForm setjwtToken={setjwtToken} />
    )
  }

  return (
   <Routes>
      <Route path='/' element={<Blog  setjwtToken={setjwtToken}/>}  />
   </Routes>
  )
}

export default App
