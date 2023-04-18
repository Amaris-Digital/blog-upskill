import Hero from "../../hero/Hero"
import Posts from "../../posts/Posts"


import Sidebar from "../../sidebar/Sidebar"
import "./home.css"

export default function Home() {
  return (
    <>
        <Hero/>
       <div className="home">
       <Posts/>
       <Sidebar />
       </div>
    </>
  )
}