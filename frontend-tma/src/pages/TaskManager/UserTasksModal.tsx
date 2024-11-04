import React, { useState } from 'react';
import {
    Modal,
    Paper,
    Typography,
    Box,
    Button,
    TextField,
    Pagination
} from '@mui/material';
import { Task, User } from 'types';

interface UserTasksModalProps {
    open: boolean;
    onClose: () => void;
    userTasks: Task[];
    newTaskDescription: string;
    setNewTaskDescription: (description: string) => void;
    handleAddTask: () => void;
    handleUpdateTaskStatus: (taskId: number) => void;
}

export const UserTasksModal: React.FC<UserTasksModalProps> = ({
    open,
    onClose,
    userTasks,
    newTaskDescription,
    setNewTaskDescription,
    handleAddTask,
    handleUpdateTaskStatus,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTasks = userTasks.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="user-tasks-title"
            aria-describedby="user-tasks-description"
        >
            <Paper sx={{ padding: 2, maxWidth: 400, margin: 'auto', marginTop: 'auto' }}>
                <Typography id="user-tasks-title" variant="h6" component="h2">
                    Task Manager
                </Typography>
                <Box>
                    {currentTasks.map(task => (
                        <Box key={task.id} sx={{ border: '1px solid #ccc', marginBottom: 1, padding: 1 }}>
                            <Typography variant="body1">{task.description}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Created: {task.createdDate} | Status: {task.status}
                            </Typography>
                            {task.status === 'unresolved' && (
                                <Button variant="contained" color="success" onClick={() => handleUpdateTaskStatus(task.id)}>
                                    Mark as Resolved
                                </Button>
                            )}
                        </Box>
                    ))}
                </Box>
                <Pagination
                    count={Math.ceil(userTasks.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
                />
                <TextField
                    label="New Task Description"
                    variant="outlined"
                    fullWidth
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddTask}>
                    Add Task
                </Button>
            </Paper>
        </Modal>
    );
};

export default UserTasksModal;
