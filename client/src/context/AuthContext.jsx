import { createContext, useContext, useReducer, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

import { LOGIN, REGISTER, LOGOUT } from '../CONSTANTS/CONSTANT';

const apiUrl = import.meta.env.VITE_REACT_API_URL;

const AuthContext = createContext();

const initialState = { user: null };

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload };
        case REGISTER:
            return { ...state, user: action.payload };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            axios
                .get(`${apiUrl}/users/verify`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    dispatch({ type: LOGIN, payload: response.data.user });
                })
                .catch((error) => {
                    console.error('Error verifying token:', error);
                });
        }
    }, []);

    const register = async (registrationData) => {
        try {
            const response = await axios.post(
                `${apiUrl}/users/register`,
                registrationData
            );
            Cookies.set('token', response.data.token);
            dispatch({ type: REGISTER, payload: response.data.user });
            console.log(response.data.user);
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                `${apiUrl}/users/login`,
                credentials
            );
            Cookies.set('token', response.data.token);
            dispatch({ type: LOGIN, payload: response.data.user });
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const logout = () => {
        Cookies.remove('token');
        dispatch({ type: LOGOUT, payload: null });
        queryClient.clear();
    };

    return (
        <AuthContext.Provider value={{ state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
