
import {Link} from "react-router-dom";
import React, { useState } from "react";
import "./write.css"


  function Write(){
     const [title, setTitle] = useState("")
     const [image, setImage] = useState("")
     const [category, setCategory] = useState("")
    const [content, setContent] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
  
      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          title: title,
          content: content,
        }),
      })
        .then((r) => r.json())
        .then((newContent) => {
          setContent("");
        });
        console.log(content);
        console.log(image);
        console.log(category);
    }
  return (
    <div className="write">
        <img 
        className="writeImg"
        src="data:image/png;base64,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"
        alt="" 
        />
       <form className="writeForm" onSubmit={handleSubmit}>
           <div className="writeFormGroup">
               <label htmlFor="fileInput">
               <i  onChange={(e) => setImage(e.target.value)} className="writeIcon fa-solid fa-circle-plus"></i>
               </label>
                <input type="file"  onChange={(e) => setTitle(e.target.value)} style={{display:"none"}}/>
                <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                 placeholder="Title" className="writeInput" autoFocus={true}/>
           </div>

             <div className="writeForm">
           <label onChange={(e) => setCategory(e.target.value)} className="blog-names">Choose a Category:</label>
                  <select onChange={(e) => setCategory(e.target.value)} name="technology" id="technology">
                  <option value="technology">Technology</option>
                  <option value="Education">Eduction</option>
                  <option value="fashion">Fashion</option>
                  <option value="Security">Security</option>
                  </select>
                </div>

           <div className="writeFormGroup">
               <textarea onChange={(e) => setContent(e.target.value)}
               placeholder="Tell your story..." 
               type="text" value={content}
               className="writeInput writeText">
               </textarea>
           </div>
           <button className="writeSubmit">Publish</button>
           <Link className="link"  to="/write">Write</Link>

       </form>
    </div>
  )
}

export default Write
