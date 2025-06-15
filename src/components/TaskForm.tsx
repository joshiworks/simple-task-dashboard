// src/components/TaskForm.tsx
import React, { useMemo } from 'react'; 
import { Task, TaskStatus } from '../context/TaskContext';
import { useForm } from '../hooks/useForm'; 
import { TASK_STATUSES } from '../constants';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  // Define the initial values for the form, to be passed to useForm
  const formInitialValues = useMemo(()=>  {
    return { title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Pending' as TaskStatus, // Cast for type safety
    dueDate: initialData?.dueDate || '',}
  },[initialData]);

  
  const validate = (values: typeof formInitialValues): { [key: string]: string | undefined } => {
    const newErrors: { [key: string]: string | undefined } = {};

    // Title validation
    if (!values.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(values.title.trim())) {
      newErrors.title = 'Title can only contain letters, numbers, and spaces';
    }

    // Due Date validation
    if (!values.dueDate.trim()) {
      newErrors.dueDate = 'Due date is required';
    }

    return newErrors;
  };

  // Use the custom useForm hook
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: formInitialValues,
    validate: validate, // Pass the validation function to the hook
    onSubmit: (formValues) => {
      // This onSubmit is called by the hook only when the form is valid and submitted
      onSubmit({
        id: initialData?.id || Date.now(), 
        ...formValues,
      } as Task);
     
    },
  });

  const today = new Date().toISOString().split('T')[0];
  const isEditMode = Boolean(initialData); // Used to determine button text

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl space-y-6">
      <div>
        <label className="block mb-1 text-left font-semibold text-gray-700">Title *</label>
        <input
          type="text"
          name="title" 
          value={values.title}
          onChange={handleChange} 
          onBlur={handleBlur} 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block mb-1 text-left font-semibold text-gray-700">Description</label>
        <textarea
          name="description" 
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur} // Optional: add onBlur for description
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-left font-semibold text-gray-700">Status</label>
        <select
          name="status" 
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur} 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          
          {TASK_STATUSES.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-left font-semibold text-gray-700">Due Date *</label>
        <input
          type="date"
          name="dueDate" // Important: `name` attribute must match state key
          min={today}
          value={values.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          // Button is disabled if there are any errors in the `errors` object
          disabled={Object.values(errors).some(error => error !== undefined)}
          className={`px-4 py-2 rounded transition-colors duration-200
            ${Object.values(errors).some(error => error !== undefined)
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`
          }
        >
          {isEditMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};