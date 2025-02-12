import React from "react";
import { useNavigate } from "react-router-dom";
import { submitBlog } from "../apis";
import { useMutation } from "@tanstack/react-query";

const WriteBlog = ({useQueryClientFn}) => {
  const [blogData, setBlogData] = React.useState({ title: "", body: "" });
  const navigate = useNavigate()
  const queryClient = useQueryClientFn()
  const {mutate} = useMutation({mutationFn: submitBlog, onSuccess:
    (newBlog)=>{
      setBlogData({title:"", body:""})
      queryClient.setQueryData(['blogs'], oldBlogs => {
        return [...oldBlogs, newBlog]
      })
    }
  })

  const handleBlogDataChange = (e) => {
    const { id, value } = e.target;
    setBlogData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSubmitBlog = async ()=>{
    mutate(blogData)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <input
        id="title"
        className="border h-12 w-150 mt-35 me-63 rounded focus:outline-0 text-center"
        type="text"
        placeholder="Title"
        value={blogData.title}
        onChange={handleBlogDataChange}
      />
      <input
        id="body"
        className="border h-108 w-150 me-63 mt-5 rounded focus:outline-0 text-center"
        type="text"
        placeholder="Body"
        value={blogData.body}
        onChange={handleBlogDataChange}
      />

      <div className="border absolute h-125 w-110 bg-white left-250 top-35">
        <div className="text-center font-bold mt-4">{blogData.title}</div>
        <div className="h-75">{blogData.body}</div>
      </div>

      <button type="button" className="border mt-10 me-50 p-3 mb-9 hover:cursor-pointer" onClick={handleSubmitBlog}>SEND BLOG</button>
      <button className="border mb-7" onClick={()=>(navigate("/profile"))}>navigate away</button>
    </div>
  );
};

export default WriteBlog;
