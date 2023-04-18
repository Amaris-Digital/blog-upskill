
// import Home from "./components/pages/home/Home";
import Navbar from "./components/Navbar/Navbar"
// import Single from "./components/pages/single/Single";
// import Write from "./components/pages/write/Write";
// import Settings from "./components/pages/settings/Settings";
// import Login from "./components/pages/login/Login";
// import SignUp from "./components/pages/register/SignUp";
// import ErrorPage from "./components/pages/ErrorPage";
// import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";





function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
       {/* <Route path="/home" element={<Home />} /> */}
       {/* <Route path="/write" element={<Write />} /> */}
       {/* <Route path="/login" element={<Login />} /> */}
       {/* <Route path="/register" element={<SignUp />} /> */}
       {/* <Route path="/single" element={<Single />} /> */}
       {/* <Route path="/settings" element={<Settings />} /> */}
       {/* <Route path="/sidebar" element={<Sidebar />} /> */}
       {/* <Route path="*" element={<ErrorPage />}/> */}
      </Routes>
    </Router>

  );
}

export default App;