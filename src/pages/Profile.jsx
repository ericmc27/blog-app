import React from "react";
import {
  useProfilePicture,
  useCustomNavigate,
  useCustomQuery,
} from "../components/customHooks";
import { uploadProfilePicture, getUserBlogs } from "../apis";

const Profile = () => {
  const [fullName, setFullName] = React.useState(
    localStorage.getItem("fullName")
  );
  const [profilePicture, setProfilePicture] = useProfilePicture();
  const { data: blogs } = useCustomQuery(["blogs"], getUserBlogs);
  const { navigateToBlog } = useCustomNavigate();

  const handlePhotoChange = async (e) => {
    const profilePicturePath = await uploadProfilePicture(e.target.files[0]);
    setProfilePicture(
      `${import.meta.env.VITE_BACKEND_URL}/static/${profilePicturePath}`
    );
    localStorage.setItem("profilePicturePath", profilePicturePath);
  };

  return (
    <div className="flex w-full">
      <div className="w-60 h-100 border rounded my-auto ms-5"></div>

      <div className="ms-70 flex flex-col items-center gap-6 rounded">

        <label htmlFor="profilePicture">
          <div className="h-[120px] w-[120px] border rounded-full hover:cursor-pointer mt-5">
            <img className="w-full h-full rounded-full" src={profilePicture} />
          </div>
        </label>

        <input
          id="profilePicture"
          className="hidden"
          type="file"
          onChange={handlePhotoChange}
        />

        <h3 className="mt-2 capitalize">{fullName}</h3>

        <div className="flex flex-col gap-6 bg-black px-10">
          {blogs?.map((blog, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col w-85 h-75 rounded bg-white shadow-2xl ${
                  index === blogs.length - 1 && "mb-5"
                } ${index === 0 && "mt-5"}`}
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
                  onClick={() => navigateToBlog(blog.id)}
                >
                  READ MORE
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
