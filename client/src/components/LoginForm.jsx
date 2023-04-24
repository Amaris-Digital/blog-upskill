import loginimage from "../assets/images/login.jpg"
import { useState } from "react"
import SignupForm from "./SignupForm"

export default function LoginForm () {

    const [showLogin, setShowLogin] = useState(true)


    return (
        showLogin ?
        <div className="w-full h-screen flex">
            <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg  sm:max-w-[900px] bg-white">
                <div className="w-full h-[550px] hidden md:block">
                    <img className="object-cover w-full h-full" src={loginimage} alt="be brilliant" />
                </div>
                <div className="flex flex-col justify-around  ">
                    <form className="flex flex-col items-center" >
                        <div>
                            <h1 className="font-login text-gray-600 py-8 my-4 text-center ">supeRails Blog</h1>
                            <p className="font-mono  font-bold mb-4 text-green-600" >Welcome to supeRails</p>
                        </div>
                        <div className="flex flex-col ">
                            <label className="text-green-600" htmlFor="email">Email</label>
                            <input className="border-b-[2px] mb-2" type="text" name="email" id="email" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password">Password</label>
                            <input className="border-b-[2px]" type="password" />
                            <p className="flex justify-end text-sm font-thin mt-1">Forgot password?</p>
                        </div>
                        <button className="w-3/12 bg-green-500 mt-3 py-1 text-white rounded">Sign in</button>
                    </form>
                    <p className="text-center">New to supeRails? 
                        <button className="underline" onClick={() => setShowLogin(false)}>
                            Signup
                        </button>
                     </p>
                </div>
            </div>
        </div> :
        <SignupForm setShowLogin={setShowLogin} />

    )
}