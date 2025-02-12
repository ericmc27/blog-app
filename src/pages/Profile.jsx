import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { uploadProfilePicture, getBlogs } from '../apis';


const Profile = () => {
  const [profilePicture, setProfilePicture] = React.useState(()=>{
    const storedPath = localStorage.getItem('profilePicturePath')
    if(storedPath==='null'){
      return '/profile-picture-placeholder.png'
    }else{
      return `${import.meta.env.VITE_BACKEND_URL}/static/${storedPath}`
    }
});

  const {data: blogs} = useQuery({queryKey:['blogs'], queryFn: getBlogs})

  const handlePhotoChange = async (e) => {
    const profilePicturePath = await uploadProfilePicture(e.target.files[0]);
    setProfilePicture(`${import.meta.env.VITE_BACKEND_URL}/static/${profilePicturePath}`)
    localStorage.setItem('profilePicturePath', profilePicturePath)
  };


  return (
    <div className='flex flex-col items-center'>
      
      <label htmlFor='profilePicture'>
      <div className='h-[120px] w-[120px] border rounded-full hover:cursor-pointer mt-5'>
        <img
          className='w-full h-full rounded-full'
          src={profilePicture}
        />
      </div>
      </label>

      <input
        id='profilePicture'
        className='hidden'
        type='file'
        onChange={handlePhotoChange}
      />

      <hr className='w-96 mt-5 border-t-2 border' />

      <ul className='mt-4'>
        <li>My Blogs</li>
      </ul>

      <div className='flex w-full'>
      <div className='w-60 h-100 border me-auto ms-5 rounded fixed'>
        
      </div>

      <div className='mt-5 w-full flex flex-col items-center gap-6'>
        {
          blogs?.map((blog, index)=>{
            return <div key={index} className='w-85 h-25 bg-white rounded shadow-2xl'>
              {blog.title}
            </div>
          })
        }
      </div>
      </div>
    </div>
  );
};

export default Profile;
