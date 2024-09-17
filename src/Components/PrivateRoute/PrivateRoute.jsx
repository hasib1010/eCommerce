import React, { useContext } from 'react'; 
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

function PrivateRoutes({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();  

    if (user) {
        return children;
    } else {
        
        return <Navigate to="/login" state={{ from: location }} />;
    }
}

export default PrivateRoutes;