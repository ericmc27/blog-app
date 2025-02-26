import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../apis";

const ReadBlog = ({ useQueryClientFn }) => {
  const { id } = useParams();
  const queryClient = useQueryClientFn();

  const cachedBlog = queryClient
    .getQueryData(["blogs"])
    ?.find((blog) => blog.id === id);

  const { data: currentBlog } = useQuery({
    queryKey: ["currentBlog", id],
    queryFn: () => getSingleBlog(id),
    enabled: !cachedBlog,
  });
  
  const profilePicture = `${import.meta.env.VITE_BACKEND_URL}/static/${
    cachedBlog ? cachedBlog.profilePicture : currentBlog?.profilePicture
  }`; //need to fix

  console.log(cachedBlog);
  return (
    <div className="flex flex-col h-screen items-center">
      <h1 className="text-4xl capitalize mt-5 max-w-200 break-words">
        {cachedBlog ? cachedBlog.title : currentBlog?.title}
      </h1>

      <hr className="border-t-2 border-dark w-150 my-4 mb-3" />

      <div>
        <img className="w-20 h-20 rounded-full mb-3" src={profilePicture} />
      </div>

      <div className="flex w-full">
        <div className="bg-white w-75 h-100 ms-9 rounded-3xl"></div>
        <div className="w-175 ms-25 text-justify whitespace-pre-line">
          {cachedBlog ? cachedBlog.body : currentBlog?.body}
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
