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
import { sliceText } from '../utils/sliceText';

import { MdModeEdit, MdDelete } from 'react-icons/md';
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
                <Table className='dark:bg-[#444]'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='dark:text-white'>
                                ID
                            </TableCell>
                            <TableCell className='dark:text-white'>
                                Title
                            </TableCell>
                            <TableCell className='dark:text-white'>
                                Description
                            </TableCell>
                            <TableCell className='dark:text-white'>
                                Actions
                            </TableCell>
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
                                    <TableCell className='dark:text-white'>
                                        {blog._id}
                                    </TableCell>
                                    <TableCell className='dark:text-white'>
                                        {blog.title}
                                    </TableCell>
                                    <TableCell className='dark:text-white'>
                                        {sliceText(blog.description, 200)}
                                    </TableCell>
                                    <TableCell className='dark:text-white'>
                                        <div className='flex gap-6'>
                                            <Link to={`/edit-blog/${blog._id}`}>
                                                <MdModeEdit
                                                    className='cursor-pointer'
                                                    size={20}
                                                    color={'#00ff00'}
                                                />
                                            </Link>
                                            <MdDelete
                                                className='cursor-pointer'
                                                size={20}
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
                className='dark:text-white'
            />
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array,
};

export default DataTable;
