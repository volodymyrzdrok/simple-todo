import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://63fefd70370fe830d9dc6132.mockapi.io';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks');

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { tasks } = getState().todo;
  //     if (tasks.length) return false;
  //     return true;
  //   },
  // }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', newTask);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'tasks/toggleStatus',
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, {
        status: !task.status,
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
