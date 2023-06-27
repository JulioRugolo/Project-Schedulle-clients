import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        message: '',
        status: false,
    });


    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
        setError({
            message: '',
            status: false,
        })
    }

    const url = 'http://localhost:4000';

    const handleClick = async(event:any) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/signin`, userData);
            location.href = '/home';
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log(response.data);
        } catch (error:any) {
            setError({
                message: 'Email ou senha incorretos',
                status: true,
            })
            console.log(error.response);
        }
    };

  return (
    <div>
        <h1 className='text-4xl font-bold text-center text-white-800'>
        Login
        </h1>
        <form 
        onSubmit={handleClick}
        className='max-w-lg mx-auto'>
        <div className='mt-5'>
            <label htmlFor='email' className='block text-white-700'>
            Email
            </label>
            <input
            type='email'
            id='email'
            name='email'
            onChange={handleChange}
            value={userData.email}
            className='block w-full px-4 py-3 rounded-md bg-gray-700  border-transparent focus:border-gray-500 focus:bg-black focus:ring-0'
            />

            <label htmlFor='password' className='block mt-5 text-white-700'>
            Password
            </label>
            <input
            type='password'
            id='password'
            name='password'
            onChange={handleChange}
            value={userData.password}
            className='block w-full px-4 py-3 rounded-md bg-gray-700  border-transparent focus:border-gray-500 focus:bg-black focus:ring-0'
            />


            <button className='w-full px-4 py-3 mt-5 text-lg font-medium text-white uppercase bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>
            Login
            </button>

            </div>
        </form>
        {error.status && <p>{error.message}</p>}
    </div>
  )
}

export default Login