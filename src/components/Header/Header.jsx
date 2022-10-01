import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'

import {
  StyledContainer,
  StyledDashboardDiv,
  StyledUserContainer,
  StyledButton,
} from './Header.styled';

const Header = () => {
  return (
  <StyledContainer>
    <StyledDashboardDiv>
      <Link to='/'>TO-DO Dashboard</Link>
    </StyledDashboardDiv>
    {
      false ? (
        <StyledButton>
          <LogoutIcon />
          <h5>Logout</h5>
        </StyledButton>
      ): (
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
      )
    }
  </StyledContainer>
  );
};
export default Header;
