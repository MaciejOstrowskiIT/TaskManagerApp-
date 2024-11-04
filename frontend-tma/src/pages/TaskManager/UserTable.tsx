import { Box, Button, Collapse, Pagination, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography, TableContainer } from "@mui/material";
import React from "react";
import { User } from "types";

interface UserTableProps {
    users: User[];
    userDetails: { [key: number]: { address?: string; phone?: string } };
    openRow: number | null;
    handleRowClick: (id: number) => void;
    handleOpenModal: (id: number) => void;
    sortBy: 'createdDate' | 'name';
    order: 'asc' | 'desc';
    handleSort: (field: 'createdDate' | 'name') => void;
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export const UserTable: React.FC<UserTableProps> = ({
    users,
    userDetails,
    openRow,
    handleRowClick,
    handleOpenModal,
    sortBy,
    order,
    handleSort,
    page,
    setPage,
    totalPages,
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'name'}
                                direction={sortBy === 'name' ? order : 'asc'}
                                onClick={() => handleSort('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'createdDate'}
                                direction={sortBy === 'createdDate' ? order : 'asc'}
                                onClick={() => handleSort('createdDate')}
                            >
                                Created Date
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <React.Fragment key={user.id}>
                            <TableRow hover onClick={() => handleRowClick(user.id)}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.createdDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <Collapse in={openRow === user.id} timeout="auto" unmountOnExit>
                                        <Box display="flex" flexDirection="column" margin={1}>
                                            <Typography variant='h6'>User Details</Typography>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" marginTop={1}>
                                                <Typography><strong>Address:</strong> {userDetails[user.id]?.address || 'Not provided'}</Typography>
                                                <Button variant="contained" color="primary" onClick={() => handleOpenModal(user.id)}>
                                                    See user tasks
                                                </Button>
                                            </Box>
                                            <Typography>
                                                <strong>Phone:</strong> {userDetails[user.id]?.phone || 'Not provided'}
                                            </Typography>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                style={{ marginTop: '16px' }}
            />
        </TableContainer>
    );
};
