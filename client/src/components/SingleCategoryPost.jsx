import { useLoaderData,  Link, redirect } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { formatDistance } from 'date-fns';
import Pagination from "./Pagination";



export default function SingleCategoryPost() {

    const category =  useLoaderData()
    console.log(category)

    const categoryPosts = category.posts
    const categoryName = category.name
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentBlogs = categoryPosts.slice(firstPostIndex, lastPostIndex)


    return (
        <div className="bg-gray-50 py-16 px-4 ">
            <div className='text-center'>
                <h2 className='text-4xl tracking-tight font-medium text-gray-900 flex w-full flex-col  capitalize'>Category: <span className="justify-end italic text-2xl"> {categoryName}</span> </h2>
            </div>
            <div className="grid gap-10 max-w-[400px] mx-auto lg:max-w-[900px]  lg:grid-cols-2 mt-12">
                {currentBlogs.map((post) => (
                    <Link className="bg-gray-50 rounded-lg shadow-lg p-8" to={`/blogs/${post.id}`} key={post.id}>
                        <div className="text-center capitalize ">
                            
                            <h1 className="font-bold text-2xl leading-7 tracking-tight text-gray-900 ">{post.title}</h1>
                        </div>

                        <div className="flex justify-center font-medium text-sm " >
                            <p className="italic ">{formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })}</p>
                            <span className='mx-1'>
                                &middot;
                            </span>
                           
                        </div>
                        <div className="mt-4">
                            <p className="text-lg leading-7 font-sans text-gray-500">{post.content.substr(0, 100)}[...]</p>
                        </div>

                    </Link>
                ))}
                <Pagination postsPerPage={postsPerPage} totalPosts={categoryPosts.length} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

// create axios instance

const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
})


// loader

export const singleCategoryPostLoader = async ({ params }) => {
    try {
        const response = await client.get(`/categories/${params.id}`)
        return response.data.body.category
    } catch (error) {
        console.log(error)
        return redirect('/login')
    }
}


