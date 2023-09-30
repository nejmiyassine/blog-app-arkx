import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import ErrorElement from './routes/ErrorPage.jsx';
import RegisterForm from './components/form/RegisterForm.jsx';
import LoginForm from './components/form/LoginForm.jsx';
import BlogForm from './components/form/BlogForm.jsx';
import Blogs from './components/Blogs.jsx';
import Container from './components/Container';
import Header from './components/Header';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import MyBlogs from './components/MyBlogs';
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
                                <BlogForm />
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
