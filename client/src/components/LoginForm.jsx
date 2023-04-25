import loginimage from "../assets/images/login.jpg"
import { useState } from "react"
import SignupForm from "./SignupForm"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function LoginForm({ setjwtToken }) {

    const [myForm, setMyForm] = useState(
        {
            email: "",
            password: "",
        }
    )

    const [errors, setErrors] = useState([])

    const onChangeBinder = (e) => {
        setMyForm((myForm) => ({
            ...myForm,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const logIn = async () => {
            try {
                const response = await axios.post("http://localhost:3000/login", myForm)
                const token = await response.data.body.token
                localStorage.setItem("jwt", token)
                setjwtToken(token)
                console.log("it is working")
                navigate("/blog")

            } catch (error) {
                setErrors(error.response.data.body.errors)
            }

        }
        logIn()
    }


    return (
        <div className="w-full h-screen flex">
            <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg  sm:max-w-[900px] bg-white">
                <div className="w-full h-[550px] hidden md:block">
                    <img className="object-cover w-full h-full" src={loginimage} alt="be brilliant" />
                </div>
                <div className="flex flex-col">
                    {errors.length > 0 && errors.map((error) => (
                        <p className="text-red-500 text-center" key={error}>{error}</p>
                    ))}
                    <form className="flex flex-col items-center h-[400px]  " onSubmit={handleSubmit} >
                        <div >
                            <h1 className="font-login text-gray-600 py-8 my-4 text-center ">supeRails Blog</h1>
                            <p className="font-mono  font-bold mb-4 text-green-600" >Welcome to supeRails</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="email">Email</label>
                            <input className="border-b-[2px] mb-2" type="text" name="email" id="email" onChange={onChangeBinder} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password" >Password</label>
                            <input className="border-b-[2px]" type="password" name="password" onChange={onChangeBinder} />
                            <p className="flex justify-end text-sm font-thin mt-1">Forgot password?</p>
                            <button type="submit" className=" bg-green-500 hover:bg-green-400 mt-3 py-1 text-white rounded-lg">Sign in</button>
                        </div>
                    </form>
                    <p className="text-center">New to supeRails?
                        <Link to='/signup' className="underline" >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}