import Modal from 'components/Modal/Modal';
import TaskItem from 'components/TaskItem/TaskItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInfo from 'components/TaskInfo/TaskInfo';
import { selectShowModal, toggleModal, selectTasks } from 'redux/todoSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const [objTaskModal, setObjTaskModal] = useState(null);
  const tasks = useSelector(selectTasks);

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
          {showModal &&
            tasks.map((task, i) => (
              <TaskItem
                key={task.id}
                task={task}
                i={i}
                handleModal={handleModal}
              />
            ))}
          {!showModal &&
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
