import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

const url = 'http://localhost:4000';

const Home = () => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async() => {
            try{
                const response = await axios.get(`${url}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data.email);
                console.log(response.data);
            } catch (error:any) {
                location.href = '/login';
                console.log(error.response.data.error);
            }   
        };
        fetchUser()
    }, []);
    return (
        <>
        <Header />
        <div>
            <h1 className='text-4xl font-bold text-center text-white-800'>
            Home
            </h1>

            {user && <h2
            className='text-2xl font-bold text-center text-white-800'>
            Bem vindo {user}!</h2>}
        </div>
        </>
    )
};

export default Home;