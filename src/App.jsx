import React from "react";
import { useCustomQuery } from "./hooks/customHooks";
import { getAllBlogs, getUserData } from "./apis";
import { io } from "socket.io-client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import WriteBlog from "./pages/WriteBlog";
import ReadBlog from "./pages/ReadBlog";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useLocation } from "react-router-dom";
import { verifyJwtToken } from "./apis";

// const GlobalContext = React.createContext(null);

// const useGlobalContext = () => {
//   return React.useContext(GlobalContext);
// };

const useQueryClientFn = () => {
  return useQueryClient();
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/blog/:blogId",
    element: <ReadBlog useQueryClientFn={useQueryClientFn} />,
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/write-blog",
        element: <WriteBlog useQueryClientFn={useQueryClientFn} />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={"/login"} />,
  },
]);

const socket = io("http://127.0.0.1:5000");

function App() {
  const queryClient = useQueryClientFn();

  React.useEffect(() => {
    socket.on("userProfilePictureUpdate", (data) => {
      queryClient.setQueryData(["user", data.userId], (oldData) => {
        return { ...oldData, profilePicture: data.newProfilePicturePath };
      });

      queryClient.setQueryData(["feedBlogs"], (oldData) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              blogs: page.blogs.map((blog) => {
                if (blog.authorId === data.userId) {
                  return {
                    ...blog,
                    authorProfilePicture: data.newProfilePicturePath,
                  };
                }
              }),
            };
          }),
        };
      });
    });

    socket.on("newBlogAdded", (data) => {
      queryClient.setQueryData(["feedBlogs"], (oldData) => {
        const updateFirstPage = {
          ...oldData.pages[0],
          blogs: [data, ...oldData.pages[0].blogs],
        };

        return {
          ...oldData,
          pages: [updateFirstPage, ...oldData.pages.slice(1)],
        };
      });
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
