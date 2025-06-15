import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Task } from "../context/TaskContext";

type UseFilteredTasksProps = {
  tasks: Task[];
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortOrder: "asc" | "desc";
};

export function useFilteredTasks({
  tasks,
  statusFilter,
  setStatusFilter,
  sortOrder,
}: UseFilteredTasksProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const location = useLocation();

 
  useEffect(() => {
    if (location.pathname === "/completed") {
      setStatusFilter("Completed");
    } else if (location.pathname === "/all") {
      setStatusFilter("All");
    }
  }, [location.pathname, setStatusFilter]);

  // Filter and sort tasks
  useEffect(() => {
    let filtered = tasks;

    if (location.pathname === "/completed") {
      filtered = tasks.filter((task) => task.status === "Completed");
    } else if (statusFilter !== "All") {
      filtered = tasks.filter((task) => task.status === statusFilter);
    }

    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTasks(filtered);
  }, [tasks, statusFilter, sortOrder, location.pathname]);

  return filteredTasks;
}