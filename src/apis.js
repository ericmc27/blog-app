export const login = async ({ email, password }) => {
  const body = {
    email,
    password,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("jwt-token", data.jwtToken);
    localStorage.setItem("user-id", data.userId);
    window.location.replace("/feed");
  }

  return response
};

export const signup = async ({ fullName, email, username, password }) => {
  const body = {
    fullName,
    email,
    username,
    password,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const uploadProfilePicture = async (profilePicture, userId) => {
  const form = new FormData();
  form.append("file", profilePicture);
  form.append("userId", userId)
  
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/upload-profile-picture`,
    {
      method: "POST",
      body: form,
      headers: {
        "Authorization": `Bearer ${getJwtToken()}`,
      },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.profilePicturePath;
  }
};

export const submitBlog = async ({ title, body }) => {
  const requestBody = { title, body };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/submit-blog`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getJwtToken()}`,
      },
    }
  );

  if(response.status===200){
    return response.json()
  }
};

export const getUserBlogs = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/get-user-blogs`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getJwtToken()}`,
      },
    }
  );

  if(response.status === 200){
    const blogs = await response.json()
    return blogs
  }
};

export const getAllBlogs = async ({pageParam})=>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-blogs/${pageParam}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${getJwtToken()}`
      }
    }
  )
  const data = await response.json()

  return data
}

export const getCurrentUserBlogs = async ({pageParam, queryKey})=>{
  const body = {userId: queryKey[1]}

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-current-user-blogs/${pageParam}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getJwtToken()}`
    }
  })

  const data = await response.json()

  return data
}

export const getSingleBlog = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-single-blog/${id}`)
  const data = await response.json()
  return data
}

export const getUserData = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-user-data/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getJwtToken()}`
    }
  })
  const data = await response.json()
  return data
}

export const verifyJwtToken = async () => {
  const jwtToken = getJwtToken(); 

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/verify-jwt-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    }
  );

  if (response.status === 200) {
    return jwtToken;
  } else {
    localStorage.removeItem("jwt-token")
    localStorage.removeItem("user-id")
    localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE")
    return null
  }
};

const getJwtToken = () => {
  return localStorage.getItem("jwt-token");
};
