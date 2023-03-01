import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from 'redux/todoOperations';
import { selectIsLoading } from 'redux/todoSlice';
import Loader from './Loader/Loader';

import TaskForm from './TaskForm/TaskForm';
import TaskList from './TaskList/TaskList';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <TaskForm />
      <div className="loader"> {isLoading && <Loader />}</div>
      <TaskList />
    </>
  );
};
