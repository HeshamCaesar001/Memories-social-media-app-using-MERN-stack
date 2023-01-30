import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/postDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    function direct(){
        return(
            <Navigate to ="/posts" />
        )
    }

    function checkLogin(){
        if(!user){
            return(<Auth/>)
        }else{
            return(
                <Navigate to ="/posts" />
            )
        }
    }
    return (
        <GoogleOAuthProvider clientId="1012537224709-uluhmcpmb0oenv2g7u6ldtp4h36lsojk.apps.googleusercontent.com" >
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path='/'  element={direct()} />
                        <Route path='/posts'  element={<Home />} />
                        <Route path='/posts/search'  element={<Home />} />
                        <Route path='/auth' element={checkLogin()} />
                    </Routes>
                </Container>
            </BrowserRouter>
         </GoogleOAuthProvider>

    )
}

export default App