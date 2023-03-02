import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';

export const todoList1 = v1();
export const todoList2 = v1();

const initialState: TodoListType[] = [
  { id: todoList1, title: 'What to learn', filter: 'active' },
  { id: todoList2, title: 'What To buy', filter: 'completed' },
];

export const todoListReducer = (state: TodoListType[] = initialState, action: ActionTodoListType) => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return [action.payload.newTodoList, ...state];
    }
    case 'REMOVE-TODOLIST': {
      return state.filter((t) => t.id !== action.payload.id);
    }
    case 'UPDATE-TODOLIST': {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, title: action.payload.newTitle } : t,
      );
    }
    case 'CHANGE-FILTER': {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t,
      );
    }
    default:
      return state;
  }
};

export type ActionTodoListType =
  | RemoveTodoListACType
  | AddTodoListACType
  | UpdateTodoListACType
  | ChangeFilterACType;

type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export const addTodoListAC = (newTodoList: TodoListType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      newTodoList: newTodoList,
    },
  } as const;
};

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export const removeTodoListAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: id,
    },
  } as const;
};

type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>;
export const updateTodoListAC = (id: string, newTitle: string) => {
  return {
    type: 'UPDATE-TODOLIST',
    payload: {
      id: id,
      newTitle: newTitle,
    },
  } as const;
};

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      id: id,
      filter: filter,
    },
  } as const;
};
