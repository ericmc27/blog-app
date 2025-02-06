import React, { useEffect } from "react"

const HomePage = ()=>{
  const [userFullName, setUserFullName] = React.useState("")

  useEffect(()=>{
    const storedFullName = localStorage.getItem("User Full Name")
    setUserFullName(storedFullName)
  }, [])

  return (
    <>
      <h1>Home</h1>
      <h2 className="capitalize text-3xl">{userFullName}</h2>
    </>
  )
}

export default HomePage