import React, { ChangeEvent, memo, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { changeStatusAC, changeTitleAC, removeTaskAC } from '../reducer/tasksReducer';
import { useDispatch } from 'react-redux';

type TodoPropsType = {
  id: string;
  taskId: string;
  title: string;
  isDone: boolean;
};

export const Task: React.FC<TodoPropsType> = memo(({ id, taskId, title, isDone }) => {
  console.log('Task')
  const dispatch = useDispatch();
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusAC(id, taskId, e.currentTarget.checked));
  };

  const updateTaskHandler = useCallback((newTitle: string) => {
    dispatch(changeTitleAC(id, taskId, newTitle));
  }, [dispatch, id, taskId]);

  const onChangeRemoveHandler = () => {
    dispatch(removeTaskAC(id, taskId));
  };
  return (
    <li key={id}>
      <Checkbox onChange={onChangeStatusHandler} checked={isDone} />
      <EditableSpan callBack={updateTaskHandler} isDone={isDone} title={title} />
      <IconButton onClick={onChangeRemoveHandler} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});
