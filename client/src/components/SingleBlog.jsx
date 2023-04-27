import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { formatDistance } from 'date-fns';
import Categories from './Categories'
import { FaRegComment } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
  }
})

export default function SingleBlog( { user } ) {
  const singleBlog = useLoaderData()
  const [comments, setComments] = useState([])
  const post_id = singleBlog.id
  const [commentBody, setCommentBody] = useState({
    body: '',
    post_id: post_id
  })

  console.log(user)

  const fetchComments = async () => {
    try {
      const response = await client.get(`/posts/${post_id}/comments`);
      setComments(response.data.body.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const postComment = async (e) => {
    e.preventDefault()
    try {
      const response = await client.post(`/posts/${post_id}/comments`, commentBody)
      // Update the comments state with the new comment
      setComments([response.data.body.comment, ...comments])
      // Clear the comment input field
      setCommentBody({
        ...commentBody,
        body: '',
      });

    } catch (error) {
      console.log(error)
    }
  }

  const onChangeBinder = (e) => {
    setCommentBody((commentBody) => ({
      ...commentBody,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteComment = (commentId) => {
    try {
      client.delete(`/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='grid grid-cols-3'>
      <div className="bg-gray-50 py-16 px-7 flex flex-col h-full col-span-2 ">
        <div className=" capitalize  mt-12">
          <p className="font-semibold text-gray-500 text-lg  ">{singleBlog.category.name}</p>
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
        <div className='mt-7 flex flex-col  '>
          <di className='flex items-center'>
            <FaRegComment className='mr-2' />
            <p className=' font-ex text-lg italic   '>Comments</p>
          </di>
          <div>
            <form>
              <input className='mt-3 border-2 border-gray-300 rounded-lg p-2 ' type="text" placeholder='Add a comment' name='body' onChange={onChangeBinder} />
              <button className='bg-red-500 text-white rounded-lg p-2 mt-3 ml-3 hover:bg-red-400 ' onClick={postComment} >Post</button>
            </form>
          </div>
          <div className='flex flex-col mt-3 '>
            {comments.map(comment => (
              <ul key={comment.id}>
                <div className=' py-2 '>
                  <div className='px-2 bg-gray-100  flex flex-col'>
                    <p className='italic font-base font-light flex justify-right p-2 gap-1 text-gray-500 text-md'>{comment.user.name} <span>{formatDistance(new Date(comment.created_at), new Date(), { addSuffix: true })}</span></p>
                    <p className='font-semibold text-gray-500 '>{comment.body}  </p>
                    {user.name === comment.user.name ? <button className='text-red-500 hover:text-red-400 flex justify-end text-3xl items-centre' onClick={() => {deleteComment(comment.id) }}> <TiDelete /></button> : ""}
                  </div>
                </div>
              </ul>
            ))}
          </div>
        </ div >
      </div>

      <div className=' bg-gray-50  mt-12 p-16 flex flex-col h-screen col-end-4 ' >
        <h1 className='font-extrabold text-3xl'>Categories</h1>
        <Categories />
      </div>

    </div>



  )
}

// axios instance wuth ayth header




export const singleBlogLoader = async ({ params }) => {
  try {
    const response = await client.get(`/posts/${params.id}`)
    return response.data.body.post
  } catch (error) {
    console.log(error)
    return redirect('/login')
  }

}
