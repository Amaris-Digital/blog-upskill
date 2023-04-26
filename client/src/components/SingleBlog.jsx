import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { formatDistance } from 'date-fns';
import Categories from './Categories'
import { FaRegComment } from 'react-icons/fa'


export default function SingleBlog() {
  const singleBlog = useLoaderData()

  return (
    <div className='grid grid-cols-3'>
      <div className="bg-gray-50 py-16 px-7 flex flex-col h-full col-span-2 ">
        <div className=" capitalize  mt-12">
          <p className="font-semibold text-gray-500  text-lg  ">{singleBlog.category.name}</p>
          <h1 className="font-bold text-4xl leading-7 tracking-tight text-gray-900 mt-3 ">{singleBlog.title}</h1>
        </div>

        <div className="flex font-medium text-sm mt-3 " >
          <p className="italic ">{formatDistance(new Date(singleBlog.created_at), new Date(), { addSuffix: true })}</p>
          <span className='mx-1'>
            &middot;
          </span>
          <p >By <span className="italic text-sm text-gray-500 font-medium">{singleBlog.user.name}</span></p>
        </div>
        <div className="mt-4">
          <p className="text-lg leading-8 font-sans text-gray-500">{singleBlog.content}</p>
        </div>
        <div className='flex mt-12  justify-evenly  '>
          {singleBlog.tags.map(tag => (
            <ul key={tag.id} className=' '>
              <li className='bg-gray-300 px-2 rounded-lg py-1 '>{tag.name}</li>
            </ul>
          ))}
        </div>
        <Link to={`/blogs/${singleBlog.id.toString()}/comments`} className='flex items-center mt-12'>
          <FaRegComment className='mr-2' />
          <p className=' font-light text-sm italic'>Comments</p>
        </ Link >
      </div>
      <div className=' bg-gray-50  mt-12 p-16 flex flex-col h-screen  ' >
        <h1 className='font-extrabold text-3xl'>Categories</h1>
        <Categories />
      </div>
    </div>



  )
}

// axios instance wuth ayth header

const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
  }
})



export const singleBlogLoader = async ({ params }) => {
  try {
    const response = await client.get(`/posts/${params.id}`)
    return response.data.body.post
  } catch (error) {
    console.log(error)
    return redirect('/login')
  }

}
