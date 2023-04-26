import React from 'react'

export default function Comments() {
  return (
    <div>Comments</div>
  )
}


// 

// loader

export const commentLoader =  async ( {params}) => {
    const response = await fetch(`http://localhost:3000/posts/${params.postId}/comments`)
    const data = await response.json()
    return data.body.comments
}