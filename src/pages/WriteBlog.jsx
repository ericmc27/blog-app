import React from "react";
import { useCustomNavigate } from "../components/customHooks";
import { submitBlog } from "../apis";
import { useMutation } from "@tanstack/react-query";

const WriteBlog = ({ useQueryClientFn }) => {
  const [blogData, setBlogData] = React.useState({ title: "", body: "" });
  const { navigateToProfile } = useCustomNavigate();
  const queryClient = useQueryClientFn(); 
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
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault()
    mutate(blogData);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <form className="flex flex-col" onSubmit={handleSubmitBlog}>
        <input
          id="title"
          className="border h-12 w-150 mt-25 me-63 rounded focus:outline-0 text-center"
          type="text"
          placeholder="Title"
          value={blogData.title}
          required
          onChange={handleBlogDataChange}
        />

        <input
          id="body"
          className="border h-108 w-150 me-63 mt-5 ps-2 pb-90 rounded focus:outline-0"
          type="text"
          placeholder="Body"
          value={blogData.body}
          minLength="250"
          required
          onChange={handleBlogDataChange}
        />

        <div className="flex">
          <button
            type="submit"
            className="border ms-55 me-5 mt-5 p-3 hover:cursor-pointer hover:bg-purple-700 hover:text-white rounded"
          >
            ADD NEW BLOG
          </button>

          <button className="border mt-5 p-3 hover:cursor-pointer hover:bg-purple-700 hover:text-white rounded" onClick={navigateToProfile}>
            PROFILE
          </button>
        </div>
      </form>

      <div className="rounded shadow-2xl absolute h-125 w-110 bg-white left-250 top-25">
        <div className="text-center font-bold mt-4">{blogData.title}</div>
        <div className="h-75">{blogData.body}</div>
      </div>
    </div>
  );
};

export default WriteBlog;
