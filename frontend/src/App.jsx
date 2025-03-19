import React from "react";
import { io } from "socket.io-client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

const Feed = React.lazy(()=>import("./pages/Feed"));
const Login = React.lazy(()=>import("./pages/Login"));
const Signup = React.lazy(()=>import("./pages/Signup"));
const Profile = React.lazy(()=>import("./pages/Profile"));
const WriteBlog = React.lazy(()=>import("./pages/WriteBlog"));
const ReadBlog = React.lazy(()=>import("./pages/ReadBlog"));
const ProtectedRoutes = React.lazy(()=>import("./components/ProtectedRoutes"));


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
    element: <Signup/>,
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
      });//Works as expected, but will make a lot of requests to the server. 

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
                else {
                  return blog
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
