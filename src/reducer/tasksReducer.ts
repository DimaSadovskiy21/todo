import { v1 } from 'uuid';
import { TasksType } from '../App';
import { TaskType } from '../components/TodoList';
import { todoList1, todoList2 } from './todoListReducer';

const initialState: TasksType = {
  [todoList1]: [
    { taskId: v1(), title: 'HTML', isDone: true },
    { taskId: v1(), title: 'css', isDone: true },
    { taskId: v1(), title: 'js', isDone: true },
    { taskId: v1(), title: 'React', isDone: false },
  ],
  [todoList2]: [
    { taskId: v1(), title: 'bread', isDone: true },
    { taskId: v1(), title: 'butter', isDone: true },
    { taskId: v1(), title: 'meat', isDone: true },
    { taskId: v1(), title: 'milk', isDone: false },
  ],
};

export const tasksReducer = (state: TasksType = initialState, action: ActionTaskType) => {
  switch (action.type) {
    case 'ADD-TASK': {
      const newTask: TaskType = {
        taskId: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...state, [action.payload.id]: [newTask, ...state[action.payload.id]] };
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter(
          (t) => t.taskId !== action.payload.taskId,
        ),
      };
    }
    case 'CHANGE-STATUS': {
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].map((t) =>
          t.taskId === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
        ),
      };
    }
    case 'CHANGE-TITLE': {
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].map((t) =>
          t.taskId === action.payload.taskId ? { ...t, title: action.payload.newTitle } : t,
        ),
      };
    }
    case 'ADD-TASKS': {
      return {
        ...state,
        [action.payload.id]: [] as TaskType[],
      };
    }
    case 'DELETE-TASKS': {
      // const stateCopy = {...state}
      // delete stateCopy[action.payload.id];
      // return stateCopy;
      let {
        [action.payload.id]: [],
        ...rest
      } = { ...state };
      return rest;
    }
    default:
      return state;
  }
};

export type ActionTaskType =
  | AddTaskACType
  | RemoveTaskACType
  | ChangeStatusACType
  | ChangeTitleACType
  | AddTasksACType
  | DeleteTasksACType;

type AddTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (id: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      id: id,
      title: title,
    },
  } as const;
};

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: id,
      taskId: taskId,
    },
  } as const;
};

type ChangeStatusACType = ReturnType<typeof changeStatusAC>;
export const changeStatusAC = (id: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      id: id,
      taskId: taskId,
      isDone: isDone,
    },
  } as const;
};

type ChangeTitleACType = ReturnType<typeof changeTitleAC>;
export const changeTitleAC = (id: string, taskId: string, newTitle: string) => {
  return {
    type: 'CHANGE-TITLE',
    payload: {
      id: id,
      taskId: taskId,
      newTitle: newTitle,
    },
  } as const;
};

type AddTasksACType = ReturnType<typeof addTasksAC>;
export const addTasksAC = (id: string) => {
  return {
    type: 'ADD-TASKS',
    payload: {
      id: id,
    },
  } as const;
};

type DeleteTasksACType = ReturnType<typeof deleteTasksAC>;
export const deleteTasksAC = (id: string) => {
  return {
    type: 'DELETE-TASKS',
    payload: {
      id: id,
    },
  } as const;
};
