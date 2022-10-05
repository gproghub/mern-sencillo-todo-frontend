import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {
  StyledContainer,
  StyledDashboardDiv,
  StyledUserContainer,
  StyledButton,
} from './Header.styled';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, reset } from '../../features/Authentication/authSlice';
import Spinner from '../Spinner/Spinner';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onClickLogoutHandler = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledDashboardDiv>
        <Link to='/'>TO-DO Dashboard</Link>
      </StyledDashboardDiv>
      {user ? (
        <StyledButton onClick={onClickLogoutHandler}>
          <LogoutIcon />
          <h5>Logout</h5>
        </StyledButton>
      ) : (
        <>
          <StyledUserContainer>
            <Link to='login'>
              <LoginIcon />
              <h5>Login</h5>
            </Link>
          </StyledUserContainer>
          <StyledUserContainer>
            <Link to='register'>
              <PersonIcon />
              <h5>Register</h5>
            </Link>
          </StyledUserContainer>
        </>
      )}
    </StyledContainer>
  );
};
export default Header;
