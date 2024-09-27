import React, { useContext } from 'react'; 
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider'; 
import { useCart } from '../Providers/CartProvider';

function PrivateRoutes({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();  
    const { state } = useCart();

    if (user) {
        return children;
    } else { 
        return (
            <Navigate 
                to="/login" 
                state={{ 
                    from: location, 
                    cartItems: state.items, 
                    total: state?.items?.reduce((total, item) => total + item.price * item.quantity, 0)
                }} 
            />
        );
    }
}

export default PrivateRoutes;
