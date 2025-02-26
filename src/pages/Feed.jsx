import React from "react";
import {
  useProfilePicture,
  useCustomNavigate,
  useCustomQuery,
} from "../hooks/customHooks";
import { getAllBlogs } from "../apis";

const Feed = ({ useQueryClientFn }) => {
  const [selection, setSelection] = React.useState("posts");
  const { navigateToProfile, navigateToBlog } = useCustomNavigate();
  const [profilePicture, setProfilePicture] = useProfilePicture();
  const { data: posts } = useCustomQuery(["feedBlogs"], getAllBlogs);

  return (
    <div className="h-screen">
      <div className="ms-144 my-7 border h-11 w-125 rounded"></div>

      <div className="flex">
        <ul className="ms-10 h-100 w-55 p-2 shadow-2xl fixed bg-white rounded-2xl">
          <li
            className={`flex flex-col p-2 rounded`}
            onClick={() => navigateToProfile(localStorage.getItem("id"))}
          >
            <img
              className="w-15 h-15 mb-4 rounded-full m-auto hover:cursor-pointer border border-gray-300"
              src={profilePicture}
            />
          </li>

          <li
            onClick={() => setSelection("posts")}
            className={`flex items-center p-2 rounded gap-2 hover:cursor-pointer ${
              selection === "posts" && "bg-purple-100"
            }`}
          >
            <img className="w-9 h-9" src="/post.png" />
            Posts
          </li>

          <li
            onClick={() => setSelection("joinGroup")}
            className={`flex items-center p-2 rounded gap-2 hover:cursor-pointer ${
              selection === "joinGroup" && "bg-purple-100"
            }`}
          >
            <img className="w-9 h-9" src="/group.png" />
            Join Group
          </li>
        </ul>

        {selection === "posts" && posts?.length > 0 ? (
          <div className="ms-132 bg-white w-150 ps-25 pt-4 rounded">
            {posts.map((post) => (
              <div className="flex flex-col items-center h-115 w-110 mb-4 bg-white border border-gray-300 rounded p-5 bg-gradient-to-b from-white to-red-50">
                <div className="w-full text-center pb-2 flex">
                  <img
                    onClick={() => navigateToProfile(post.id)}
                    className="w-15 h-15 rounded-full border border-gray-300 hover:cursor-pointer"
                    src={`${import.meta.env.VITE_BACKEND_URL}/static/${
                      post.profilePicture
                    }`}
                  />
                  <label className="mt-4 capitalize ms-2 me-auto">
                    Written by {post.author}
                  </label>
                  <label className="text-gray-400">{post.date}</label>
                </div>

                <h1 className="text-2xl pb-2">{post.title}</h1>

                <div className="text-justify">{post.body.slice(0, 550)}...</div>
                <button
                  onClick={() => navigateToBlog(post.id)}
                  className="border p-3 mt-2 hover:cursor-pointer bg-red-500 text-white"
                >
                  Read More...
                </button>
              </div>
            ))}
          </div>
        ) : (
          selection === "joinGroup" && (
            <div className="ms-132 bg-white w-150 ps-25 pt-4 rounded">
              <h1>Join group</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
