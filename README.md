# Task Management Dashboard

A simple Task Management Dashboard where users can view, add, edit, and delete tasks.

---

## Features

- **Display a list of tasks**  
  Each task card has:
  - Title
  - Description
  - Status (`Pending`, `In Progress`, `Completed`)
  - Due Date

- **Task Management**
  - Add new tasks with validation (title and due date are mandatory)
  - Edit task details
  - Delete tasks

- **Filtering & Sorting**
  - Filter tasks by status
  - Sort tasks by due date

- **Summary**
  - Dashboard shows a summary at the top with the count of tasks in each status

---

## Design

- Custom hooks - useForm(), useFilteredTasks()
- Responsive layout (grid or list view) with a modern UI
- Modal form component for adding and editing tasks
-  

---

## Tech Stack

- React (with Context API, localStorage for state management)
- TypeScript
- Tailwind CSS (for styling)