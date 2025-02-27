import React from "react";
import { useCustomQuery } from "./hooks/customHooks";
import { getAllBlogs } from "./apis";
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
    path: "/blog/:id",
    element: <ReadBlog useQueryClientFn={useQueryClientFn} />,
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Feed/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
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



const socket = io("http://127.0.0.1:5000")

function App() {
  const queryClient = useQueryClientFn()

  React.useEffect(()=>{
    socket.on("userProfilePictureUpdate", (data)=>{
      queryClient.setQueryData(["user", data.id], (oldData)=>{
        return {...oldData, profilePicture:data.newProfilePicturePath}
    })

    queryClient.invalidateQueries(["feedBlogs"])
    queryClient.prefetchQuery({queryKey: ["feedBlogs"], queryFn: getAllBlogs})
  })
  }, [])

  return(
    <RouterProvider router={router} />
  )
 
}

export default App;
