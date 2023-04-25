import axios from "axios"
import { useLoaderData, Link } from "react-router-dom"
import { formatDistance } from 'date-fns';


const Blog = ({ }) => {

    const blogs = useLoaderData()

    return (
        <div className="bg-gray-50 py-16 px-4 ">
             <div className='text-center'>
                <h2 className='text-4xl tracking-tight font-extrabold text-gray-900'>From the blog</h2>
            </div>
            <div className="grid gap-10 max-w-[400px] mx-auto md:max-w-[900px]  md:grid-cols-2 mt-12">
                {blogs.map((blog) => (
                    <Link  className="bg-gray-50 rounded-lg shadow-lg p-8" to='/' key={blog.id}>
                        <div className="text-center capitalize ">
                            <p className="font-semibold text-gray-500 ">{blog.category.name}</p>
                            <h1 className="font-bold text-2xl leading-7 tracking-tight text-gray-900 ">{blog.title}</h1>
                        </div>
                        
                        <div className="flex justify-center font-medium text-sm " >
                            <p className="italic ">{formatDistance(new Date(blog.created_at), new Date(), { addSuffix: true })}</p>
                            <span className='mx-1'>
                                &middot;
                            </span>
                            <p >By <span className="italic text-sm text-gray-500 font-medium">{blog.user.name}</span></p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg leading-7 font-sans text-gray-500">{blog.content.substr(0, 100)}[...]</p>
                        </div>
                    </Link>
                ))}

            </div>
        </div>


    )
}

// loader function

// to make sure the user is logged in
const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
})

export const blogsLoader = async () => {
    try {
        const response = await client.get("/posts")
        console.log(response.data.body.posts)
        return response.data.body.posts
    } catch (error) {
        console.log(error)

    }
}

export default Blog