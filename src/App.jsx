import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import WriteBlog from './pages/WriteBlog';
import ProtectedRoutes from './components/ProtectedRoutes';

const GlobalContext = React.createContext(null);

const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};

const useQueryClientFn = () => {
  return useQueryClient();
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/write-blog',
        element: <WriteBlog useQueryClientFn={useQueryClientFn} />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
