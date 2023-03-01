import { useDispatch } from 'react-redux';
import { toggleStatus } from 'redux/todoOperations';
import { toggleModal } from 'redux/todoSlice';
import s from './TaskInfo.module.css';

const TaskInfo = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleStatus(task));
  };

  const { title, description, status } = task;
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <h4>Description :</h4>
      <p>{description}</p>
      <div className={s.statusContainer}>
        <p className={s.status}>Status :</p>
        <input
          className={s.checkbox}
          type="checkbox"
          defaultChecked={status}
          onChange={handleToggle}
        />
      </div>
      <button onClick={() => dispatch(toggleModal())}> Close </button>
    </div>
  );
};

export default TaskInfo;
