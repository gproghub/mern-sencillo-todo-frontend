import {
  StyledTodoContainer,
  StyledTodoActionContainer,
  StyledActionTodo,
} from './Todo.Styled';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { deleteTodo, updateTodo } from '../../features/Todos/todosSlice';
import { useDispatch } from 'react-redux';

const Todo = ({ todo = {} }) => {
  const dispatch = useDispatch();
  const convertDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };

  const hanleEditTodoClick = (e) => {};

  const hanleDeleteTodoClick = () => {
    dispatch(deleteTodo(todo?._id));
  };

  return (
    <>
      <StyledTodoContainer>
        <StyledTodoActionContainer>
          <h1>{todo.text}</h1>
          <StyledActionTodo>
            <Tooltip title='Edit Todo'>
              <IconButton onClick={hanleEditTodoClick}>
                <EditIcon sx={{ color: '#219ebc' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Todo'>
              <IconButton onClick={hanleDeleteTodoClick}>
                <DeleteIcon sx={{ color: '#ca6702' }} />
              </IconButton>
            </Tooltip>
          </StyledActionTodo>
        </StyledTodoActionContainer>
        <p>{`Created at: ${convertDate(todo.createdAt)}`}</p>
      </StyledTodoContainer>
    </>
  );
};
export default Todo;
