import { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
  StyledButtonContainer,
} from '../Register/Register.styled';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../../features/Authentication/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginFormData;

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
      setToastMessage(message);
    }
    if (isSuccess && user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  };

  const onChangeHandler = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

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
          <form onSubmit={onSubmitFormHandler}>
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
            <StyledButtonContainer>
              <Button
                disabled={email === '' || password === ''}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message={toastMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        action={action}
      />
    </>
  );
};
export default Login;
