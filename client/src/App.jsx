import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import ErrorElement from './routes/ErrorPage.jsx';
import RegisterForm from './components/form/RegisterForm.jsx';
import LoginForm from './components/form/LoginForm.jsx';
import Container from './components/Container';
import Header from './components/Header';
import Blogs from './components/Blogs.jsx';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import MyBlogs from './components/MyBlogs';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import EditBlog from './pages/EditBlog/EditBlog';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const { state } = useAuth();

    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Blogs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/create-blog'
                        element={
                            <ProtectedRoute>
                                <CreateBlog />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/edit-blog/:blogId'
                        element={
                            <ProtectedRoute>
                                <EditBlog />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            state.user ? <Navigate to='/' /> : <RegisterForm />
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            state.user ? <Navigate to='/' /> : <LoginForm />
                        }
                    />
                    <Route
                        path='/blog/:id'
                        element={
                            <ProtectedRoute>
                                <BlogDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/my-blogs'
                        element={
                            <ProtectedRoute>
                                <MyBlogs />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<ErrorElement />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
