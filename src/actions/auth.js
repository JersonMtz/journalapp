import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { Toast } from '../helper/alert';
import { types } from '../types';
import { hideLoading, showLoading } from './loading';

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
);

export const logout = () => ({ type: types.logout });

export const logOutUser = () => {
    return (dispatch) => {
        dispatch(showLoading());

        signOut(auth).then(() => {
        
            dispatch(logout());
            dispatch(hideLoading());
        
        })
        .catch(err => {
            dispatch(hideLoading());
            Toast.fire({
                icon: 'error',
                title: err
            });
        });
    }
}

export const siginWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        dispatch(showLoading());
        
        signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {

            dispatch(login(user.uid, user.displayName));
            dispatch(hideLoading());
        
        })
        .catch((err) => {
            dispatch(hideLoading());
            
            Toast.fire({
                icon: 'error',
                title: err
            });
        
        });
    }
}

export const siginWithGoogle = () => {
    return (dispatch) => {
        dispatch(showLoading());
        
        signInWithPopup(auth, provider)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName));
                dispatch(hideLoading());

            })
            .catch(err => {
                dispatch(hideLoading());
                Toast.fire({
                    icon: 'error',
                    title: err
                });
            });
    }
}

export const registerWithEmailAndPassword = (name, email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, { displayName: name });
                dispatch(login(user.uid, name));
            })
            .catch(err => {
                Toast.fire({
                    icon: 'error',
                    title: err
                });
            });
    }
}