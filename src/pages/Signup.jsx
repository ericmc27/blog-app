import React from 'react'
import { signup } from '../apis';

const Signup = () => {
  const [signupData, setSignupData] = React.useState({fullName:'', email:'', username:'', password:''})

  const handleInputChange = (e)=>{
    const {id, value} = e.target
    setSignupData(prev=>({...prev, [id]:value}))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(signupData)
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        style={{ height: '450px', width: '374px' }}
        className='flex flex-col items-center shadow-2xl rounded-sm bg-white'
        onSubmit={handleFormSubmit}
      >
        <img
          style={{ height: '64px', margin: '14px 0px 0px 0px' }}
          src='/signup.png'
        />

        <label
          style={{ marginTop: '20px', marginBottom: '4px' }}
          htmlFor='fullName'
        >
          FULL NAME
        </label>
        <input
          id='fullName'
          style={{ height: '34px', marginBottom:'6px'}}
          className='border w-72 rounded-sm focus:outline-purple-700 p-1.5'
          onChange={handleInputChange}
          type='text'
          required
        />

        <label
          style={{ marginBottom: '4px' }}
          htmlFor='email'
        >
          EMAIL
        </label>
        <input
          id='email'
          style={{ height: '34px', marginBottom:'6px'}}
          className='border w-72 rounded-sm focus:outline-purple-700 p-1.5'
          onChange={handleInputChange}
          type='email'
          required
        />

        <label
          style={{ marginBottom: '4px' }}
          htmlFor='username'
        >
          USERNAME
        </label>
        <input
          id='username'
          style={{ height: '34px', marginBottom:'6px'}}
          className='border w-72 rounded-sm focus:outline-purple-700 p-1.5'
          onChange={handleInputChange}
          type='text'
          required
        />

        <label
          style={{ marginBottom: '4px' }}
          htmlFor='password'
        >
          PASSWORD
        </label>
        <input
          id='password'
          style={{ height: '34px', marginBottom:'19px'}}
          className='border w-72 rounded-sm focus:outline-purple-700 p-1.5'
          onChange={handleInputChange}
          type='password'
          required
        />

        <button
          style={{ height: '44px'}}
          className='border cursor-pointer w-20 hover:bg-purple-700 hover:text-white'
          type='submit'
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default Signup;
