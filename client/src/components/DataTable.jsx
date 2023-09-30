import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from '@mui/material';

import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBlog } from '../api/blogsApi';

const DataTable = ({ data }) => {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteBlogMutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const handleDeleteBlog = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlogMutation.mutate(blogId);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((blog) => (
                                <TableRow key={blog._id}>
                                    <TableCell>{blog._id}</TableCell>
                                    <TableCell>{blog.title}</TableCell>
                                    <TableCell>{blog.description}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-6'>
                                            <Link to={`/edit-blog/${blog._id}`}>
                                                <AiFillEdit
                                                    className='cursor-pointer'
                                                    size={24}
                                                    color={'#00ff00'}
                                                />
                                            </Link>
                                            <MdDelete
                                                className='cursor-pointer'
                                                size={24}
                                                color={'#ff0000'}
                                                onClick={() =>
                                                    handleDeleteBlog(blog._id)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 10, 25]} // You can customize the available rows per page options
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array,
};

export default DataTable;
