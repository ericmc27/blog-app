import React, {createContext, useContext} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './components/ProtectedRoutes'

const GlobalContext = createContext(null)

const useGlobalContext = ()=>{
  return useContext(GlobalContext)
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login useGlobalContext={useGlobalContext}/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        path: '/home',
        element: <HomePage/>
      }
    ],
  }
  
])



function App() {
  return (
    <GlobalContext.Provider value={0}>
       <RouterProvider router={router}/>
    </GlobalContext.Provider>
  )
}

export default App
