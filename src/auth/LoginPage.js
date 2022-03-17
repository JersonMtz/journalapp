import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { siginWithEmailAndPassword, siginWithGoogle } from '../actions/auth';

const initialForm = { 
    email: '', 
    password: '' 
}

const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });
}

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const handleLogin = ({ email, password }, { setSubmitting }) => {
        dispatch(siginWithEmailAndPassword(email, password));
        
        if (!auth.uid) {
            setSubmitting(false);
        }
    }

    const handleSiginGoogle = () => dispatch(siginWithGoogle());

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <Formik 
                initialValues={ initialForm } 
                validationSchema={ validationSchema }  
                onSubmit={ handleLogin }>
                
                {({ isSubmitting, dirty, isValid }) => (
                    <Form className="animate__animated animate__fadeIn">
                        <Field 
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="auth__input"
                            autoComplete="off"
                            required
                        />

                        <Field 
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="auth__input"
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={ isSubmitting || (!dirty || !isValid)  }>
                            Login
                        </button>
                        
                        <div className="auth__social-networks">
                            <p>Login with social networks</p>
                            <div 
                                className="google-btn"
                                onClick={ handleSiginGoogle }>
                                <div className="google-icon-wrapper">
                                    <img 
                                        className="google-icon" 
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                                        alt="google button" />
                                </div>
                                <p className="btn-text">
                                    <b>Sign in with google</b>
                                </p>
                            </div>
                        </div>

                        <Link 
                            to="/auth/register"
                            className="link">
                            Create new account    
                        </Link>
                    </Form>
                )}

            </Formik>
        </>
    )
}
