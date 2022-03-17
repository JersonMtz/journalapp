import { Navigate } from 'react-router-dom';

export const PublicRouter = ({ children, isLogged }) => {
    
    return !isLogged ?
        children :
        <Navigate to="/" />
}
