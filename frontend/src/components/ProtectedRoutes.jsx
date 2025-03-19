import React, { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { verifyJwtToken } from "../apis"


const ProtectedRoutes = ()=>{
  const [jwtToken, setJwtToken] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  useEffect(()=>{
      const fetchJwtToken = async ()=>{
        const jwtToken = await verifyJwtToken()
        setJwtToken(jwtToken)
        setLoading(false)
      }

      fetchJwtToken()
  }, [])

  if (loading) return null

    return(
        jwtToken  !== null ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default ProtectedRoutes