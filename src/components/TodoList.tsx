import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback } from 'react';
import { FilterValuesType } from '../App';
import { AddTodo } from './AddTodo';
import { EditableSpan } from './EditableSpan';
import { Tasks } from './Tasks';
import { deleteTasksAC } from '../reducer/tasksReducer';
import { removeTodoListAC, updateTodoListAC } from '../reducer/todoListReducer';
import { useDispatch } from 'react-redux';

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskType = {
  taskId: string;
  title: string;
  isDone: boolean;
};

export const TodoList: React.FC<TodolistPropsType> = ({ id, title, filter }) => {
  const dispatch = useDispatch();

  const onChangeRemoveTodoListHandler = () => {
    dispatch(removeTodoListAC(id));
    dispatch(deleteTasksAC(id));
  }

  const onChangeUpdateTodoListHandler = useCallback((newTitle: string) => {
    console.log('todo')
    dispatch(updateTodoListAC(id, newTitle));
  },[dispatch, id]);

  return (
    <div>
      <div>
        <EditableSpan callBack={onChangeUpdateTodoListHandler} title={title} />
        <IconButton onClick={onChangeRemoveTodoListHandler} aria-label="delete" size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>

      <AddTodo id={id}  />
      <Tasks
        id={id}
        filter={filter}
      />
    </div>
  );
};
