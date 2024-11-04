import { Task } from "./Task";

export type TaskResponse = {
  currentPage: number;
  totalPages: number;
  tasks: Task[];
};
