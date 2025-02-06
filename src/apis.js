export const login = async ({email, password})=>{
    const body = {
        email,
        password,
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
    
    if(response.status === 200){
        const data = await response.json()
        localStorage.setItem('JWT', data.token)
        localStorage.setItem("User Full Name", data.fullName)
        window.location.replace('/home')
    }

}

export const signup = async ({fullName, email, username, password})=>{
    const body = {
        fullName,
        email,
        username,
        password,
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const verifyJwt = async ()=>{
    const token = localStorage.getItem("JWT")
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if(response.status===200){
        return token
    }else{
        return null
    }
} 