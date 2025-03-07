import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useProfilePicture = (cachedBlog, currentBlog) => {
  return cachedBlog?.authorProfilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}/static/${
        cachedBlog.authorProfilePicture
      }`
    : currentBlog?.authorProfilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}/static/${
        currentBlog.authorProfilePicture
      }`
    : false
};

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    navigate(`/profile?id=${id}`);
  };

  const navigateToBlog = (blogId, pageIndex) => {
    navigate(`/blog/${blogId}`, { state: { pageIndex } });
  };

  const navigateToPath = (path) => {
    navigate(path);
  };

  return { navigateToProfile, navigateToBlog, navigateToPath };
};

export const useCustomQuery = (key, fn) => {
  return useQuery({ queryKey: key, queryFn: fn });
};
