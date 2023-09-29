import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const { state, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    console.log(state.user);

    return state.user ? (
        <div>
            <h2>Authorized</h2>
            <p>{state.user.username}</p>
            <img src={`${state.user.image}`} alt={state.user.username} />
            <button onClick={handleLogout}>Logout</button>
        </div>
    ) : (
        <div>
            <h2>not Authorized</h2>
        </div>
    );
};

export default ProtectedRoute;
