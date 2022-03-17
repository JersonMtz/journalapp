import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { AuthRouter } from '../auth/AuthRouter';
import { auth } from '../firebase/config';
import { JournalPage } from '../Pages/JournalPage';
import { login } from '../actions/auth';
import { Loading } from '../components/Loading';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { startLoadNotes } from '../actions/note';

export const AppRouter = () => {

    const { uiLoading } = useSelector(state => state);
    const dispatch = useDispatch();
    const [isLogged, setIsLogged] = useState(true);
    
    useEffect(() => {
        
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setIsLogged(true);
                dispatch(login(user.uid, user.displayName));
                dispatch(startLoadNotes());
            } else {
                setIsLogged(false);
            }
        });


    }, [dispatch]);

    return (
        <Router>
            
            { uiLoading && <Loading /> }
            
            <Routes>
                <Route path="/" element={
                    <PrivateRouter isLogged={ isLogged }>
                        <JournalPage /> 
                    </PrivateRouter>
                } />

                <Route path="auth/*" element={ 
                    <PublicRouter isLogged={ isLogged }>
                        <AuthRouter /> 
                    </PublicRouter>
                } />
            </Routes>
        </Router>
    )
}