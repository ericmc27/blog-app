import React, { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { verifyJwt } from "../apis"


const ProtectedRoutes = ()=>{
  const [token, setToken] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(()=>{
      const fetchToken = async ()=>{
        const token = await verifyJwt() 
        setToken(token)
        setLoading(false)
      }

      fetchToken()
  }, [])

  if (loading) return null

    return(
        token !== null ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default ProtectedRoutes