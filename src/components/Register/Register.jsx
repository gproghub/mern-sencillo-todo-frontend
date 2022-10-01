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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, reset } from '../../features/Authentication/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = registerData;
  useEffect(() => {
    if(isSuccess || user) {
      navigate('/')
    }
  }, [])

  //Form handlers
  const submitData = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(reset());
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
  };

  const onChangeHandler = (e) => {
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
                autoComplete='username'
                onChange={onChangeHandler}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                autoComplete='username'
                onChange={onChangeHandler}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                autoComplete='new-password'
                onChange={onChangeHandler}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                placeholder='Confirm your password'
                autoComplete='new-password'
                onChange={onChangeHandler}
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
