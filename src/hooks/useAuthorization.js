import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuthorization = (allowedRoles = []) => {
    const { status, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!status) {
            navigate('/login', { state: { from: location } });
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
            navigate('/', { replace: true });
        }
    }, [status, role, navigate, location]); // Need to omit allowedRoles from dependency to avoid infinite loops if passed inline

    return { isAuthorized: status && (allowedRoles.length === 0 || allowedRoles.includes(role)) };
};
