import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './components/AddItemForm';
import { ButtonAppBar } from './components/ButtonAppBar';
import { TodoList, TaskType } from './components/TodoList';
import { AppRootStateType } from './reducer/store';
import { addTasksAC } from './reducer/tasksReducer';
import { addTodoListAC } from './reducer/todoListReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksType = {
  [key: string]: TaskType[];
};

// export type TasksType = Record<string, TaskType[]>;

export const App = () => {
  
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
  const dispatch = useDispatch();

  const addTodoListHandler = useCallback((titleTodoList: string) => {
    let newTodoList: TodoListType = { id: v1(), title: titleTodoList, filter: 'all' };
    dispatch(addTodoListAC(newTodoList));
    dispatch(addTasksAC(newTodoList.id));
  },[dispatch]);

  const todoListsMap = todoLists.map((t) => (
    <Grid item key={t.id}>
      <Paper style={{ padding: '10px' }}>
        <TodoList
          id={t.id}
          title={t.title}
          filter={t.filter}
        />
      </Paper>
    </Grid>
  ));
  return (
    <div>
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm callBack={addTodoListHandler} />
        </Grid>
        <Grid container spacing={3}>
          {todoListsMap}
        </Grid>
      </Container>
    </div>
  );
};
