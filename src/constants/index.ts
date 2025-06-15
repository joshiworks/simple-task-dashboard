
export const STATUS = {
    ADD : 'ADD_TASK',
    EDIT: 'EDIT_TASK',
    DELETE: 'DELETE_TASK'
} as const;



export const SORT = {
    ASC : 'asc',
    DESC: 'desc',
} as const;

export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];