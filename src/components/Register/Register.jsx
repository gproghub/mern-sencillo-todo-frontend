import { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
  StyledButtonContainer,
} from './Register.styled';
import { Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = registerData;

  const submitData = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <PersonIcon />
            Register
          </h1>
          <p>Please create an account</p>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={submitData}>
            <StyledInputContainer>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
            </StyledInputContainer>
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
            <StyledInputContainer>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                placeholder='Confirm your password'
                onChange={onChange}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                disabled={
                  name === '' ||
                  email === '' ||
                  password === '' ||
                  confirmPassword === ''
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
export default Register;
