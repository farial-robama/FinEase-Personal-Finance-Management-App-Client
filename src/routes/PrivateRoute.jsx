import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ( {children}) => {
    const { user, loading } = use(AuthContext)
    
    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to="/auth/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;