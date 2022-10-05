import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
} from '../Register/Register.styled';
import Todo from '../Todo/Todo';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { getTodos, reset, createTodo } from '../../features/Todos/todosSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todos);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getTodos());
  }, [user, navigate, dispatch]);

  //Creating the to-dos
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo(todoText));
    setTodoText('');
  };

  const handleTodoChange = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <DashboardIcon />
            {`Welcome ${user?.name}`}
          </h1>
          <p>Start adding to-dos</p>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={handleSubmit}>
            <StyledInputContainer>
              <input
                type='text'
                id='todo'
                name='todo'
                value={todoText}
                placeholder='Add to-do text'
                onChange={handleTodoChange}
              />
            </StyledInputContainer>
          </form>
          {todos?.map((todo) => (
            <Todo key={todo?._id} todo={todo}/>
          ))}
        </StyledFormContainer>
      </StyledContainer>
    </>
  );
};
export default Dashboard;
