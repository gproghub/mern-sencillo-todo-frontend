import { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
  StyledButtonContainer,
} from '../Register/Register.styled';
import { Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';

const Login = () => {
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
  });
  const { email, password } = loginData;

  const submitData = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <LoginIcon />
            Login
          </h1>
          <p>Please log into your account</p>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={submitData}>
            <StyledInputContainer>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={onChange}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                disabled={
                  email === '' ||
                  password === ''
                }
                variant='contained'
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </StyledButtonContainer>
          </form>
        </StyledFormContainer>
      </StyledContainer>
    </>
  );
};
export default Login;
