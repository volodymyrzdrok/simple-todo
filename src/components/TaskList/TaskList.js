import Modal from 'components/Modal/Modal';
import TaskItem from 'components/TaskItem/TaskItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from 'redux/todoSlice';
import TaskInfo from 'components/TaskInfo/TaskInfo';
import { selectShowModal, toggleModal } from 'redux/todoSlice';

const TaskList = () => {
  const tasks = useSelector(selectTasks);

  const dispatch = useDispatch();
  const [objTaskModal, setObjTaskModal] = useState(null);

  const showModal = useSelector(selectShowModal);

  const handleModal = obj => {
    setObjTaskModal(obj);
    dispatch(toggleModal());
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <TaskItem
                key={task.id}
                task={task}
                i={i}
                handleModal={handleModal}
              />
            ))}
        </tbody>
      </table>
      {showModal && <Modal children={<TaskInfo task={objTaskModal} />} />}
    </>
  );
};

export default TaskList;
