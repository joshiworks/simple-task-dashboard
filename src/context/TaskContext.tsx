import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { STATUS } from '../constants';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number };

type TaskContextType = {
  tasks: Task[];
  dispatch: Dispatch<Action>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case STATUS.ADD:
      return [...state, action.payload];
    case STATUS.EDIT:
      return state.map(task => task.id === action.payload.id ? action.payload : task);
    case STATUS.DELETE:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};
