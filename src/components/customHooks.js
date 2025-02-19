import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useProfilePicture = ()=>{
  const [profilePicture, setProfilePicture] = React.useState(() => {
    const storedPath = localStorage.getItem("profilePicturePath");
    if (storedPath === "null") {
      return "/profile-picture-placeholder.png";
    } else {
      return `${import.meta.env.VITE_BACKEND_URL}/static/${storedPath}`;
    }
  });

  return [profilePicture, setProfilePicture]
}

export const useCustomNavigate = ()=>{
  const navigate = useNavigate()

  const navigateToProfile = ()=>{
    navigate("/profile")
  }

  const navigateToBlog = (id)=>{
    console.log(id)
    navigate(`/blog/${id}`)
  }

  return {navigateToProfile, navigateToBlog}
}

export const useCustomQuery = (key, fn)=>{
  return useQuery({queryKey:key, queryFn:fn})
}
