import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import './style.scss';

const LoginView = (props) => {
    const { postLogin, user, setUser, handleKeyEnter } = props;

    const handleChangeUser = (key, value) => {
        switch (key) {
            case 'username':
                setUser({...user, username: value.toLowerCase()});
                break;
            case 'password':
                setUser({...user, password: value});
                break;
            default:
                break;
        }
    }

    return (
        <Box className='box-login-page'>
            <div class="login-container">
                <div class="screen">
                    <div class="screen__content">
                        <form class="login">
                            <div class="login__field">
                                <input 
                                    type="text" 
                                    class="login__input" 
                                    placeholder="User name / Email" 
                                    onChange={(e) => handleChangeUser('username', e.target.value)}
                                />
                            </div>
                            <div class="login__field">
                                <input 
                                    type="password" 
                                    class="login__input" 
                                    placeholder="Password" 
                                    onChange={(e) => handleChangeUser('password', e.target.value)}
                                />
                            </div>
                            <button class="button login__submit" onClick={postLogin}>
                                <span class="button__text">Log In Now</span>
                                <i class="button__icon fa fa-chevron-right"></i>
                            </button>				
                        </form>
                        <div class="social-login">
                            <div class="social-icons">
                                <a href="#" class="social-login__icon fa fa-instagram"></a>
                                <a href="#" class="social-login__icon fa fa-facebook"></a>
                                <a href="#" class="social-login__icon fa fa-twitter"></a>
                            </div>
                        </div>
                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>		
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>
        </Box>
    );
};

export default LoginView;
