import loginimage from '../assets/images/login.jpg'

const SignupForm = ({setShowLogin}) => {

    return (

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
                            <label className="text-green-600" htmlFor="Name">Name</label>
                            <input className="border-b-[2px] mb-2" type="text" name="name" id="name" />
                        </div>
                        <div className="flex flex-col ">
                            <label className="text-green-600" htmlFor="email">Email</label>
                            <input className="border-b-[2px] mb-2" type="text" name="email" id="email" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password">Password</label>
                            <input className="border-b-[2px] mb-2" type="password" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-600" htmlFor="password confirmation">Password Confirmation</label>
                            <input className="border-b-[2px]" type="password" />
                        </div>
                        <button className="w-3/12 bg-green-500 mt-3 py-1 text-white rounded">Register</button>
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