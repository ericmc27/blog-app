export const login = async ({ email, password }) => {
  const body = {
    email,
    password,
  };

  const response = await fetch(
    `/api/login`,
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
    console.log(data)
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
    `/api/signup`,
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
    `/api/upload-profile-picture`,
    {
      method: "POST",
      body: form,
      headers: {
        'X-CSRF-TOKEN': await getCsrfToken()
      }
    }
  );
};

export const submitBlog = async ({ title, body }) => {
  const requestBody = { title, body };

  const response = await fetch(
    `/api/submit-blog`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if(response.status===200){
    return response.json()
  }
};

export const getUserBlogs = async () => {
  const response = await fetch(`/api/get-user-blogs`,{method: "GET"});

  if(response.status === 200){
    const blogs = await response.json()
    return blogs
  }
};

export const getAllBlogs = async ({pageParam})=>{
  const response = await fetch(`/api/get-all-blogs/${pageParam}`, {method: 'GET'})
  const data = await response.json()
  return data
}

export const getCurrentUserBlogs = async ({pageParam, queryKey})=>{
  const body = {userId: queryKey[1]}
  const csrfToken = await getCsrfToken()

  const response = await fetch(`/api/get-current-user-blogs/${pageParam}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken
    }
  })

  const data = await response.json()
  return data
}

export const getSingleBlog = async (id) => {
  const response = await fetch(`/api/get-single-blog/${id}`, {method: 'GET'})
  const data = await response.json()
  return data
}

export const getLoggedInUserData = async () => {
  const response = await fetch("/api/get-logged-in-user-data", {method: 'GET'})
  const data = await response.json()
  console.log(data)
  return data
}

export const getCurrentProfileData = async (id) => {
  const response = await fetch(`/api/get-current-user-data/${id}`, {method: 'GET'})
  const data = await response.json()
  console.log(data)
  return data
}

export const verifyJwtToken = async () => {
  const response = await fetch(`/api/verify-jwt-token`, {method: 'GET'})

  if (response.status === 200) {
    return response.json()
  } else {
    localStorage.removeItem("user-id")  
    return null
  }
};

const getCsrfToken = async () => {
  return document.cookie.split("=")[1]
}