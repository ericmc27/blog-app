import React from "react";
import {
  useProfilePicture,
  useCustomNavigate,
  useCustomQuery,
} from "../components/customHooks";
import { getAllBlogs } from "../apis";

const Feed = ({ useQueryClientFn }) => {
  const [selection, setSelection] = React.useState("posts");
  const { navigateToProfile } = useCustomNavigate();
  const [profilePicture, setProfilePicture] = useProfilePicture();
  const { data: posts } = useCustomQuery(["feedBlogs"], getAllBlogs);

  return (
    <div className="h-screen">
      <div className="mx-auto my-7 border h-11 w-115 rounded"></div>

      <div className="flex">
        <ul className="ms-10 h-100 w-55 p-2 bg-white">
          <li className={`flex flex-col p-2 rounded`}>
            <img
              className="w-26 h-27 mb-4 rounded-full outline-purple-700"
              src={profilePicture}
            />
            <div
              onClick={navigateToProfile}
              className="ps-10 hover:cursor-pointer"
            >
              Go to Profile
            </div>
          </li>

          <li
            onClick={() => setSelection("posts")}
            className={`flex items-center p-2 rounded gap-2 hover:cursor-pointer ${
              selection === "posts" && "bg-purple-100"
            }`}
          >
            <img height={"45px"} width={"45px"} src="/post.png" />
            Posts
          </li>

          <li
            onClick={() => setSelection("joinGroup")}
            className={`flex items-center p-2 rounded gap-2 hover:cursor-pointer ${
              selection === "joinGroup" && "bg-purple-100"
            }`}
          >
            <img height={"45px"} width={"45px"} src="/group.png" />
            Join Group
          </li>
        </ul>

        <div className="ms-87">
          {selection === "posts"
            ? posts?.map((post) => (
                <div className="border h-100 w-100 bg-white mb-4 rounded">
                  {post.title}
                  {post.body}
                </div>
              ))
            : selection === "joinGroup" && <h1>Join group</h1>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
