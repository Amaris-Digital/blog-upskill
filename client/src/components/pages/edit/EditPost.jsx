import React, { useState } from "react";

function EditPost({ id, content, onUpdatePost }) {
  const [postContent, setPostContent] = useState(content);

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/posts$/{id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",                                                      
      },     
      body: JSON.object({
        content: postContent,
      }),
    })
      .then((r) => r.json())
      .then((updatedPost) => onUpdatePost(updatedPost));
  }

  return (
    <form className="singlePostEdit" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="content"
        autoComplete="off"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <input onSubmit={handleSubmit} type="submit" value="Save" />
      <button className="writeSubmit">Send</button>
    </form>

  );
}

export default EditPost;