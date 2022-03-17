import { Navigate } from 'react-router-dom';

export const PrivateRouter = ({ children, isLogged }) => {
    
    return isLogged ?
        children :
        <Navigate to="/auth/login" />
}
