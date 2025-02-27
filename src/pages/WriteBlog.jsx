import React from "react";
import { useCustomNavigate } from "../hooks/customHooks";
import { submitBlog } from "../apis";
import { useMutation } from "@tanstack/react-query";

const WriteBlog = ({ useQueryClientFn }) => {
  const [blogData, setBlogData] = React.useState({ title: "", body: "" });
  const { navigateToProfile } = useCustomNavigate();
  const queryClient = useQueryClientFn();
  const divRef = React.useRef(null)
  const textAreaRef = React.useRef(null)

  const { mutate } = useMutation({
    mutationFn: submitBlog,
    onSuccess: (newBlog) => {
      setBlogData({ title: "", body: "" });
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        return [...oldBlogs, newBlog];
      });
    },
  });

  const handleBlogDataChange = (e) => {
    const { id, value } = e.target;
    setBlogData((prev) => ({ ...prev, [id]: value }));

    if(id === "body"){
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
      divRef.current.scrollTop = divRef.current.scrollHeight
    } 
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    mutate(blogData);
  };


  return (
    <div className="flex flex-col items-center h-screen">
      <form className="flex flex-col" onSubmit={handleSubmitBlog}>
        <input
          id="title"
          className="border h-12 w-150 mt-5 rounded focus:outline-0 text-center m-auto"
          type="text"
          placeholder="Title"
          value={blogData.title}
          required
          onChange={handleBlogDataChange}
        />

        <div className="flex gap-15">
          <textarea
            ref={textAreaRef}
            id="body"
            className="border h-125 w-150 mt-5 px-5 pt-5 pb-5 rounded focus:outline-0 text-justify" 
            type="text"
            placeholder="Body"
            value={blogData.body}
            minLength="250"
            required
            onChange={handleBlogDataChange}
          />

          <div ref={divRef} className="rounded shadow-2xl mt-5 px-5 pb-5 h-125 w-150 bg-white overflow-auto">
            <div className="text-center font-bold mt-4 break-words pb-4"> 
              {blogData.title}
            </div>

            <div
               className="break-words whitespace-pre-line text-justify"
            >
              {blogData.body}
            </div>
          </div>

        </div>

        <div className="flex">
          <button
            type="submit"
            className="border ms-55 me-5 mt-5 p-3 hover:cursor-pointer hover:bg-purple-700 hover:text-white rounded"
          >
            ADD NEW BLOG
          </button>

          <button
            className="border mt-5 p-3 hover:cursor-pointer hover:bg-purple-700 hover:text-white rounded"
            onClick={()=>(navigateToProfile(localStorage.getItem("id")))}
          >
            PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
