import React from 'react';
import { Task } from '../context/TaskContext';

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};
export const TaskCard: React.FC<Props> = ({ task, onDelete, onEdit}: Props) => 
{

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <div className="flex flex-col gap-2 mb-4">
              <p className="text-sm">
              <span className="font-medium text-gray-700">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Due:</span>{' '}
              <span className="text-gray-600">{task.dueDate}</span>
            </p>
          </div>
          <div className="flex flex-row  gap-8 justify-end">
            <button
                onClick={() => onEdit(task.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
          </div>
        </div>
      );
    
}
    
    
    