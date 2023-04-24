import loginimage from '../assets/images/login.jpg'
import { useState } from 'react'
import axios from 'axios'

const SignupForm = ({ setShowLogin, setjwtToken }) => {

    const [myForm, setMyForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const signUp = async () => {
            try {
                const response = await axios.post("http://localhost:3000/create_account", myForm)
                const token = await response.data.body.token
                localStorage.setItem("user", token)
                setjwtToken(token)
            } catch (error) {
                setErrors(error.response.data.body.errors)
            }
        }

        signUp()
    }

    const onChangeBinder = (e) => {
        setMyForm((myForm) => ({
            ...myForm,
            [e.target.name]: e.target.value,
        }));
    };


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
                    <form className="flex flex-col items-center h-[450px]  " onSubmit={handleSubmit} >
                        <div >
                            <h1 className="font-login text-gray-600 py-8 my-4 text-center ">supeRails Blog</h1>
                            <p className="font-mono  font-bold mb-4 text-green-600" >Welcome to supeRails</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="name">Name</label>
                            <input className="border-b-[2px] mb-2" type="text" name="name" id="name" onChange={onChangeBinder} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="email">Email</label>
                            <input className="border-b-[2px] mb-2" type="text" name="email" id="email" onChange={onChangeBinder} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password" >Password </label>
                            <input className="border-b-[2px] mb-2" type="password" name="password" onChange={onChangeBinder} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password_confirmation" >Password Confirmation </label>
                            <input className="border-b-[2px] mb-2" type="password" name="password_confirmation" onChange={onChangeBinder} />
                            <button className=" bg-green-500 hover:bg-green-400 mt-3 py-1 text-white rounded-lg">Sign in</button>
                        </div>
                    </form>
                    <p className="text-center">Already have an account?
                        <button className="underline" onClick={() => setShowLogin(true)}>
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default SignupForm