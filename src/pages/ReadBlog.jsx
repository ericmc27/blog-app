import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleBlog } from "../apis";
import { useProfilePicture } from "../hooks/customHooks";

const ReadBlog = ({ useQueryClientFn }) => {
  const { blogId } = useParams();
  const pageIndex =  useLocation().state?.pageIndex
  const queryClient = useQueryClientFn();

  const cachedBlog = queryClient
    .getQueryData(["feedBlogs"])?.pages[pageIndex]?.blogs.find((blog) => blog.blogId === blogId);

  const { data: currentBlog } = useQuery({
    queryKey: ["currentBlog", blogId],
    queryFn: () => getSingleBlog(blogId),
    enabled: !cachedBlog,
  });

  const authorProfilePicture = useProfilePicture(cachedBlog, currentBlog) || "/profile-picture-placeholder.png"

  return (
    <div className="flex flex-col h-screen items-center">
      <h1 className="text-4xl capitalize mt-5 max-w-200 break-words">
        {cachedBlog ? cachedBlog.title : currentBlog?.title}
      </h1>

      <hr className="border-t-2 border-dark w-150 my-4 mb-3" />

      <div>
        <img className="w-20 h-20 rounded-full mb-3" src={authorProfilePicture && authorProfilePicture} />
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
