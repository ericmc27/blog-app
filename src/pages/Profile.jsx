import React, { useEffect } from 'react';
import { uploadProfilePicture } from '../apis';

const Profile = () => {
  const [profilePicture, setProfilePicture] = React.useState(()=>{
    const storedPath = localStorage.getItem('profilePicturePath')
    if(storedPath==='null'){
      return '/profile-picture-placeholder.png'
    }else{
      return `${import.meta.env.VITE_BACKEND_URL}/static/${storedPath}`
    }
});

  const handlePhotoChange = async (e) => {
    const profilePicturePath = await uploadProfilePicture(e.target.files[0]);
    setProfilePicture(`${import.meta.env.VITE_BACKEND_URL}/static/${profilePicturePath}`)
    localStorage.setItem('profilePicturePath', profilePicturePath)
  };

  return (
    <div className='container flex flex-col items-center'>
      
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
    </div>
  );
};

export default Profile;
