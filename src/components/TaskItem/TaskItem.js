import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleStatus } from 'redux/todoOperations';

const TaskItem = ({ task, i, handleModal }) => {
  const { id, title, description, status } = task;
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleStatus(task));
  const hendleDelete = () => dispatch(deleteTask(id));

  const openModal = e => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      handleModal(task);
    }
    return;
  };

  return (
    <>
      <tr onClick={e => openModal(e)}>
        <td>{i + 1}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td className="btnDelCont">
          <input
            className="checkbox"
            type="checkbox"
            checked={status}
            onChange={handleToggle}
          />
          <button className="btnDel" onClick={hendleDelete}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

TaskItem.propTypes = {
  handleModal: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskItem;
