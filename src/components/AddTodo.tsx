import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addTaskAC } from '../reducer/tasksReducer';
import { changeFilterAC } from '../reducer/todoListReducer';
import { AddItemForm } from './AddItemForm';

type AddTodoPropsType = {
  id: string;
};

export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id }) => {
  console.log('AddTodo')
  const dispatch = useDispatch();
  const addTaskHandler = useCallback((taskTitle: string) => {
    dispatch(addTaskAC(id, taskTitle));
    dispatch(changeFilterAC(id, 'all'));
  }, [dispatch, id]);

  return <AddItemForm callBack={addTaskHandler} />;
});
