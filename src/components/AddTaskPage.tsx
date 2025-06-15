import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useTaskContext, Task } from '../context/TaskContext';
  import { TaskForm } from './TaskForm';
import {  STATUS } from '../constants';
  
  export const AddTaskPage: React.FC = () => {
    const { dispatch } = useTaskContext();
    const navigate = useNavigate();
  
    const handleAddTask = (task: Task) => {
      dispatch({ type: STATUS.ADD, payload: task });
      navigate('/');
    };
  
    return (
      <div style={{ padding: '1rem' }}>
        <h1>Add New Task</h1>
        <TaskForm onSubmit={handleAddTask} onCancel={() => navigate('/')} />
      </div>
    );
  };