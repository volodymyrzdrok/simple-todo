import { useLocalStorage } from 'hooks/useLocalStorage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from 'redux/todoOperations';
import s from './TaskForm.module.css';

const TaskForm = () => {
  const dispatch = useDispatch();
  const defaultErrMessage = {
    titleErr: false,
    descripErr: false,
  };
  const defaultTaskValue = {
    title: '',
    description: '',
  };
  const [errMessage, setErrMessage] = useState(defaultErrMessage);
  const [taskValue, setTaskValue] = useLocalStorage(
    'todo-form',
    defaultTaskValue
  );

  const onChangeInput = e => {
    const { name, value } = e.target;
    setTaskValue(prevContactValue => ({
      ...prevContactValue,
      [name]: value,
    }));
    if (name === 'title' && value.trim().length === 1) {
      setErrMessage(prevContactValue => ({
        ...prevContactValue,
        titleErr: false,
      }));
    }
    if (name === 'description' && value.trim().length === 1) {
      setErrMessage(prevContactValue => ({
        ...prevContactValue,
        descripErr: false,
      }));
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const { title, description } = taskValue;

    if (!title.trim()) {
      setErrMessage(prev => ({
        ...prev,
        titleErr: true,
      }));
    } else if (!description.trim()) {
      setErrMessage(prev => ({
        ...prev,
        descripErr: true,
      }));
    } else {
      dispatch(
        addTask({
          title: title.trim(),
          description: description.trim(),
          status: false,
        })
      );
      setTaskValue(defaultTaskValue);
      setErrMessage(defaultErrMessage);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label>
        Title:
        <br />
        <input
          type="text"
          name="title"
          onChange={onChangeInput}
          value={taskValue.title}
          placeholder="Enter title"
          className={errMessage.titleErr ? s.borderRedInp : s.inputDefault}
        />
        <p className={errMessage.titleErr ? s.errMessage : s.textDefault}>
          This field is empty
        </p>
      </label>
      <label>
        Description:
        <br />
        <input
          type="text"
          name="description"
          onChange={onChangeInput}
          value={taskValue.description}
          placeholder="Enter decription"
          className={errMessage.descripErr ? s.borderRedInp : s.inputDefault}
        />
        <p className={errMessage.descripErr ? s.errMessage : s.textDefault}>
          This field is empty
        </p>
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default TaskForm;
