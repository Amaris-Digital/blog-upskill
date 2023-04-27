import React from 'react'
import {Form, redirect} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function Write() {


  return (
    <div className=' mt-12 items-center flex flex-col '>
        <h3 className='mt-3 tracking-tight font-bold text-3xl font-sans italic'>What is your mind</h3>

        <Form className='flex flex-col h-screen w-[550px] mx-0 p-5 ' method='post' action='/create'>
            <label className='flex gap-2 flex-col' >
                <span className='italic text-2xl '>Category:</span>
                <input className='rounded border shadow-md shadow-red-400 ' type="text" name='category_name' />
            </label>
            <label className='flex gap-2 flex-col mt-3' >
                <span className='italic text-2xl '>Title:</span>
                <input className='rounded border shadow-md shadow-red-400 ' type="text" name='title' />
            </label>
            
            <label className='flex flex-col gap-2 mt-2 '>
                <span className='italic text-2xl'>Your thoughts:</span>
                <textarea className='rounded-lg shadow-md shadow-red-500' name="content" id="" cols="60" rows="10"></textarea>
            </label>
            <label className='flex mt-3 flex-col gap-2 '>
                <span className='italic text-2xl '>Tags:</span>
                <input className='border shadow-md shadow-red-400' type="text" name='tag_names' />
            </label>
            <div className='flex justify-center mt-4'>
                <button className='rounded-full bg-red-500 w-1/2 mx-0  ' >Create Blog</button>
            </div>
        </Form>

    </div>
  )
}

const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
})




export const createBlog = async ({request}) => {

    const data = await request.formData()



    const submission = {
        category_name: data.get('category_name'),
        content: data.get('content'),
        title: data.get('title'),
        tag_names: data.get('tag_names')
    }

    try {
        const response = await client.post('/posts', submission)
        return redirect('/')
    } catch (e) {
        // setErrors(e.response.data.errors)
        // get errors to display on page
        return redirect('/write')
    }



}