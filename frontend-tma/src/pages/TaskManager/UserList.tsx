import { useState, useEffect } from 'react';
import { useAuthorizedRequest } from "hooks";
import { User, Task, TaskResponse } from 'types';
import { useAlertContext } from 'providers';
import { UserTasksModal, UserTable } from '.';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'createdDate' | 'name'>('createdDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<{ [key: number]: { address?: string; phone?: string } }>({});
  const [openModal, setOpenModal] = useState(false);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState('')

  const { getRequest, postRequest, patchRequest } = useAuthorizedRequest();
  const { message, setMessage } = useAlertContext()

  const loadUsers = async () => {
    try {
      const response = await getRequest<User[]>(`api/users?page=${page}&sortBy=${sortBy}&order=${order}`);
      setMessage({ alertType: 'info', content: 'Data loaded successfully' })
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
      setMessage({ alertType: 'error', content: 'An error occured while loading users' })
    }
  };

  const loadUserDetails = async (id: number) => {
    try {
      const response = await getRequest<{ address?: string; phone?: string }>(`api/users/${id}`, "4052");
      setUserDetails(prev => ({ ...prev, [id]: response.data }));
      setMessage({ alertType: 'info', content: 'Details loaded successfully' })
      console.log(userDetails)
    } catch (error) {
      console.error("Error fetching user details", error);
      setMessage({ alertType: 'error', content: 'An error occured while loading user details' })
    }
  };

  const loadUserTasks = async (id: number, page: number = 1, sortBy: string = 'createdDate', order: string = 'asc', filter?: string) => {
    try {
      const filterQuery = filter ? `&filter=${filter}` : '';
      const response = await getRequest<TaskResponse>(`api/users/${id}/tasks?page=${page}&sortBy=${sortBy}&order=${order}${filterQuery}`, "4053");
      setUserTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching user tasks", error);
      setMessage({ alertType: 'error', content: 'An error occured while loading user tasks' })
    }
  };

  const handleOpenModal = (id: number) => {
    setCurrentUserId(id);
    loadUserTasks(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTaskDescription('');
  };

  const handleAddTask = async () => {
    if (currentUserId !== null) {
      try {
        const response = await postRequest<Task>(`api/users/${currentUserId}/tasks`, { description: newTaskDescription }, '4053');
        setUserTasks(prev => [...prev, response.data]);
        setNewTaskDescription('');
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const handleUpdateTaskStatus = async (taskId: number) => {
    if (currentUserId !== null) {
      try {
        const response = await patchRequest<Task>(`api/users/${currentUserId}/tasks/${taskId}`, { status: "resolved" }, "4053");
        setUserTasks(prev => prev.map(task => (task.id === taskId ? response.data : task)));
      } catch (error) {
        console.error("Error updating task status", error);
      }
    }
  };

  const handleSort = (field: 'createdDate' | 'name') => {
    setOrder(prevOrder => (sortBy === field && prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortBy(field);
  };

  const handleRowClick = (id: number) => {
    setOpenRow(openRow === id ? null : id);

    if (openRow !== id) {
      loadUserDetails(id);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, sortBy, order]);


  return (
    <>
      <UserTable
        users={users}
        userDetails={userDetails}
        openRow={openRow}
        handleRowClick={handleRowClick}
        handleOpenModal={handleOpenModal}
        sortBy={sortBy}
        order={order}
        handleSort={handleSort}
        page={page}
        setPage={setPage}
        totalPages={10}
      />

      <UserTasksModal
        open={openModal}
        onClose={handleCloseModal}
        userTasks={userTasks}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        handleAddTask={handleAddTask}
        handleUpdateTaskStatus={handleUpdateTaskStatus} />
    </>

  );
};
