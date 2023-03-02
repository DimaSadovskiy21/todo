import React, { memo} from 'react';
import { FilterBlock } from './FilterBlock';
import { Task } from './Task';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TaskType } from './TodoList';
import { FilterValuesType, TasksType } from '../App';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../reducer/store';

type TasksPropsType = {
  id: string;
  filter: FilterValuesType;
};

export const Tasks: React.FC<TasksPropsType> = memo(({ id, filter }) => {
  console.log('tasks')
  const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks[id].filter((t) => !t.isDone);
      case 'completed':
        return tasks[id].filter((t) => t.isDone);
      default:
        return tasks[id];
    }
  };

  let filteredTasksToRender: Array<TaskType> = getFilteredTasks();

  let filteredTasksToRenderMap = filteredTasksToRender.length ? (
    filteredTasksToRender.map(({ taskId, title, isDone }) => {
      return <Task key={taskId} id={id} taskId={taskId} title={title} isDone={isDone} />;
    })
  ) : (
    <span>Tasks list is empty</span>
  );

  return (
    <div>
      <ul ref={listRef}>{filteredTasksToRenderMap}</ul>

      <FilterBlock id={id} filter={filter} />
    </div>
  );
});
