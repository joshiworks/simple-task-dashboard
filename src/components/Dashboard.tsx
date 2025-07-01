import { useState, useTransition } from "react";
import { useTaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { Modal } from "./Modal";
import { SORT, STATUS, TASK_STATUSES } from "../constants";
import { Link } from "react-router-dom";
import { useFilteredTasks } from "../hooks/useFilteredTasks";

export const Dashboard: React.FC = () => {
  const { tasks, dispatch } = useTaskContext();
  const [editingTask, setEditingTask] = useState<null | typeof tasks[0]>(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(SORT.ASC);
  const [searchText, setSearchText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAddClick = () => {
    setEditingTask(null);
    setFormVisible(true);
  };



  const handleEdit = (task: typeof tasks[0]) => {
    setEditingTask(task);
    setFormVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: STATUS.DELETE, payload: id });
  };

  const handleFormSubmit = (task: typeof tasks[0]) => {
    dispatch({
      type: editingTask ? STATUS.EDIT : STATUS.ADD,
      payload: task,
    });
    setFormVisible(false);
  };

  const handleModalClose = () => {
    setFormVisible(false);
  };

  const onInputChange = (event: any)=> {
   // console.log('event.target.value:', event.target.value);
    startTransition(() => {
      setSearchText(event.target.value);
    });
  }

  const filteredTasks = useFilteredTasks({
    tasks,
    statusFilter,
    setStatusFilter,
    sortOrder,
  });

  return (
    <div className="dashboard">
      <header>
        <h1>Task Dashboard</h1>
        <div className="flex flex-row p-10 gap-30">
        <Link to="/all" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium">All Tasks</Link>
        <Link to="/completed" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium">Completed</Link>
        </div>
        
        <div className='flex flex-row gap-5 items-center bg-blue-100 border-1 '>
          <p className='flex-1'>Pending: {tasks.filter(t => t.status === 'Pending').length}</p>
          <p className='flex-1'>In Progress: {tasks.filter(t => t.status === 'In Progress').length}</p>
          <p  className='flex-1'>Completed: {tasks.filter(t => t.status === 'Completed').length}</p>
        </div>
         <div className="flex items-center flex-row gap-10 mt-10 mb-10">
            <label className="block mb-1 text-left font-semibold text-gray-700 place-items-center">Filter By Status:</label>
              <select
              value={statusFilter}
              disabled={location.pathname === "/completed"}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-80 max-w-xs border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="All">All</option>
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <label className="block mb-1 text-left font-semibold text-gray-700 place-items-center">Sort By Due Date:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-30"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>

            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-yellow-600" onClick={handleAddClick}>+ Add Task</button>

            <section>
           <div>
           <label id="Search:">Search By:</label>
           <input aria-label="Search" id="search"  placeholder="Search by Title/Description"type="text" className="border-2 p-2" onChange={onInputChange} height={20} width={30} />
           </div>
      </section>    
            
        </div>
        
      </header>

      {isFormVisible && (
          <Modal isOpen={isFormVisible} onClose={handleModalClose}>
            <TaskForm
              initialData={editingTask || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleModalClose}
            />
        </Modal>
      )}
     
     

      <section>
        {filteredTasks.length === 0 ? (
          <p className="py-10 text-2xl">No tasks matching the criteria.</p>
        ) : (


          filteredTasks.filter(({title, description})=>{
           return  searchText!=='' ? (title.includes(searchText) || description.includes(searchText)): true
          }).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={()=> { 
                handleEdit(task);
              }}
            />
          ))
        )}
      

      </section>
    </div>
  );
};

export default Dashboard;