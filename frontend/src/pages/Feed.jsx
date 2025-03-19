import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCustomNavigate, useCustomQuery } from "../hooks/customHooks";
import { getLoggedInUserData, getAllBlogs } from "../apis";
import { useInView } from "react-intersection-observer";
;

const Feed = () => {
  const loggedInUserId = localStorage.getItem("user-id")
  
  const { data: loggedInUserData } = useCustomQuery(
    ["user", loggedInUserId],
    getLoggedInUserData,
  );

  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: ["feedBlogs"],
  //   queryFn: getAllBlogs,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  // });

  const [selection, setSelection] = React.useState("posts");

  const { navigateToProfile, navigateToBlog, navigateToPath } =
    useCustomNavigate();

  // const { ref, inView } = useInView({ triggerOnce: true });

  // React.useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  return (
    <div className="flex flex-col">
      <div className="h-11 w-full fixed bg-[#0A1828] "></div>

      <div className="flex justify-center h-screen">
        
        <ul className="h-100 w-55 p-2 shadow-2xl fixed top-35 left-10 bg-white rounded-2xl hidden xl:block">
          <li
            className={`flex flex-col p-2 rounded`}
            onClick={() => navigateToProfile(loggedInUserId)}
          >
            <img
              className="w-15 h-15 mb-4 rounded-full m-auto hover:cursor-pointer border border-gray-300"
              src={
                loggedInUserData?.profilePicture
                  ? `${import.meta.env.VITE_BACKEND_URL}/static/${
                      loggedInUserData?.profilePicture
                    }`
                  : "/profile-picture-placeholder.png"
              }
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

        {/* {selection === "posts" ? (
          <div className="flex flex-col items-center pt-16 shadow-2xl w-170 rounded bg-white">
            {data?.pages[0]?.blogs?.length > 0 ? (
              data.pages?.map((page, pageIndex) =>
                page.blogs?.map((blog, blogIndex) => (
                  <div
                    key={blog.blogId}
                    ref={blogIndex === 2 ? ref : null}
                    className="flex flex-col items-center h-115 w-110 mb-4 border border-gray-300 rounded p-5 bg-gradient-to-b from-white to-yellow-50 gap-3"
                  >
                    <div className="w-full text-center pb-2 flex">
                      <img
                        onClick={() => navigateToProfile(blog.authorId)}
                        className="w-15 h-15 rounded-full border border-gray-300 hover:cursor-pointer"
                        src={
                          blog?.authorProfilePicture
                            ? `${import.meta.env.VITE_BACKEND_URL}/static/${
                                blog.authorProfilePicture
                              }`
                            : "/profile-picture-placeholder.png"
                        }
                      />
                      <label
                        style={{ fontSize: "17px" }}
                        className="mt-4 capitalize ms-2 me-auto"
                      >
                        Written <span className="lowercase">by</span>{" "}
                        {blog.authorName}
                      </label>
                      <label className="text-gray-400">{blog.date}</label>
                    </div>

                    <div className="text-justify">
                      <h1 className="text-2xl pb-2 text-center capitalize">
                        {blog.title}
                      </h1>

                      <p>{blog.body.slice(0, 490)}...</p>
                    </div>

                    <div>
                      <button
                        onClick={() => navigateToBlog(blog.blogId, pageIndex)}
                        className="border p-3 hover:cursor-pointer bg-purple-700 text-white"
                      >
                        Read More...
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : (
                <button
                  onClick={() => navigateToPath("/write-blog")}
                  className="border p-2 rounded h-14 w-40 bg-purple-700 text-white ms-12 my-auto hover:cursor-pointer"
                >
                  Write the first blog
                </button>
            )}
          </div>
        ) : (
          selection === "joinGroup" && (
            <div className="ms-132 bg-white w-150 ps-25 pt-4 rounded">
              <h1>Join group</h1>
            </div>
          )
        )} */}
      </div>
    </div>
  );
};

export default Feed;
