import { createSlice } from '@reduxjs/toolkit';
import {
  addTask,
  deleteTask,
  fetchTasks,
  toggleStatus,
} from './todoOperations';

const defaultState = {
  tasks: [],
  isLoading: false,
  error: null,
  showModal: false,
};

const todoSlise = createSlice({
  name: 'todo',
  initialState: defaultState,
  reducers: {
    toggleModal(state, _) {
      state.showModal = !state.showModal;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.tasks = [...state.tasks, payload];
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        const index = state.tasks.findIndex(task => task.id === payload.id);
        state.tasks.splice(index, 1);
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
      })

      .addCase(toggleStatus.fulfilled, (state, { payload }) => {
        const index = state.tasks.findIndex(c => c.id === payload.id);
        state.tasks.splice(index, 1, payload);
      })
      .addMatcher(
        action => {
          return (
            action.type.endsWith('pending') && action.type.startsWith('tasks')
          );
        },
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action => {
          return (
            action.type.endsWith('fulfilled') && action.type.startsWith('tasks')
          );
        },
        state => {
          state.error = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        action => {
          return (
            action.type.endsWith('rejected') && action.type.startsWith('tasks')
          );
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const todoReduces = todoSlise.reducer;
export const selectTasks = state => state.todo.tasks;
export const selectIsLoading = state => state.todo.isLoading;
export const selectShowModal = state => state.todo.showModal;

export const { toggleModal } = todoSlise.actions;
