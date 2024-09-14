import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const hasStartedPaymentSession = localStorage.getItem('hasStartedPaymentSession') === 'true';

  if (!hasStartedPaymentSession) { 
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
