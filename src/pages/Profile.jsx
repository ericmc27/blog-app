import React from "react";
import { useLocation } from "react-router-dom";
import {
  getUserData,
  uploadProfilePicture,
  getCurrentUserBlogs,
} from "../apis";
import { useCustomQuery, useCustomNavigate } from "../hooks/customHooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Profile = () => {
  const userId = new URLSearchParams(useLocation().search).get("id");
  const { navigateToBlog } = useCustomNavigate();

  const { data: currentUserData } = useCustomQuery(["user", userId], () =>
    getUserData(userId)
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["userBlogs", userId],
    queryFn: getCurrentUserBlogs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handlePhotoChange = async (e) => {
    await uploadProfilePicture(e.target.files[0], userId);
  };

  const {ref, inView} = useInView({triggerOnce: true})
  console.log(hasNextPage)

  React.useEffect(()=>{
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="flex h-screen">
      <div className="mx-auto flex flex-col items-center rounded">
        <div className="h-45 w-120 flex flex-col items-center justify-center rounded mt-2">
          <label htmlFor="profilePicture">
            <div className="h-[120px] w-[120px] border rounded-full hover:cursor-pointer mt-5">
              <img
                className="w-full h-full rounded-full"
                src={
                  currentUserData?.profilePicture
                    ? `${import.meta.env.VITE_BACKEND_URL}/static/${
                        currentUserData?.profilePicture
                      }`
                    : "/profile-picture-placeholder.png"
                }
              />
            </div>
          </label>

          <input
            id="profilePicture"
            className="hidden"
            type="file"
            onChange={handlePhotoChange}
          />

          <h3 className="mt-2 capitalize">{currentUserData?.fullName}</h3>
        </div>

        <div className="flex flex-col gap-6 bg-amber-50 px-10">
          {data?.pages.map((page, pageIndex) =>
            page.blogs.map((blog, blogIndex) => {
              return (
                <div
                  key={blog.blogId}
                  ref={blogIndex == 2 ? ref : null}
                  className={`flex flex-col w-85 h-75 rounded bg-white shadow-2xl ${
                    pageIndex === 0 && blogIndex === 0 && "mt-8"
                  } ${
                    pageIndex === data.pages.length - 1 &&
                    blogIndex === page.blogs.length - 1 &&
                    "mb-5"
                  }`}
                >
                  <div className="mt-2 ms-3">{blog.date}</div>
                  <div className="text-center font-black capitalize">
                    {blog.title}
                  </div>
                  <hr className="w-55 mt-2 border-t-2 border text-gray-200 mx-auto" />

                  <div className="text-justify p-4">
                    {blog.body.slice(0, 225)}...
                  </div>
                  <button
                    className="p-2 mt-auto mx-auto mb-7 border rounded hover:cursor-pointer hover:bg-purple-700 hover:text-white"
                    onClick={() => navigateToBlog(blog.blogId)}
                  >
                    READ MORE
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
