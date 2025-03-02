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
    localStorage.setItem("JWT", data.token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("profilePicturePath", data.profilePicturePath);
    localStorage.setItem("fullName", data.fullName);
    window.location.replace("/");
  }
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

export const uploadProfilePicture = async (profilePicture, id) => {
  const form = new FormData();
  form.append("file", profilePicture);
  form.append("id", id)
  // console.log(id)

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/upload-profile-picture`,
    {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
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
        Authorization: `Bearer ${getJwtToken()}`,
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
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }
  );

  if(response.status === 200){
    const blogs = await response.json()
    return blogs
  }
};

export const getAllBlogs = async ()=>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-blogs`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`
      }
    }
  )
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

export const verifyJwt = async () => {
  const token = getJwtToken(); 

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/private`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return token;
  } else {
    window.location.href = "/login"
  }
};

const getJwtToken = () => {
  return localStorage.getItem("JWT");
};
