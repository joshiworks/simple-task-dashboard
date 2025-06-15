import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext, Task } from '../context/TaskContext';
import { TaskForm } from '../components/TaskForm';
import { STATUS } from '../constants';

export const EditTaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks, dispatch } = useTaskContext();
  const navigate = useNavigate();


  const taskToEdit = tasks.find((task) => task.id === Number(taskId));

  if (!taskToEdit) return <p className="text-center text-red-600">Task not found</p>;

  const handleEdit = (updatedTask: Task) => {
    dispatch({ type: STATUS.EDIT, payload: updatedTask });
    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <TaskForm
        initialData={taskToEdit}
        onSubmit={handleEdit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
};
