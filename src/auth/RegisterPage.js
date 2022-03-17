import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerWithEmailAndPassword } from '../actions/auth';

const initialForm = {
    name: '',
    email: '',
    password1: '',
    password2: ''
}

const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required('Nombre es requerido'),
        email: Yup.string().email('No es un email válido').required('Email es requerido'),
        password1: Yup.string().min(6, 'Contraseña debe ser minímo de 6 carácteres').required('Contraseña requerida'),
        password2: Yup.string().oneOf([Yup.ref('password1')], 'Las contraseñas debe ser iguales').required()
    });
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const handleSubmit = ({ name, email, password1 }, { resetForm }) => {
        dispatch(
            registerWithEmailAndPassword(name, email, password1)
        );

        resetForm();
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <Formik 
                initialValues={ initialForm } validationSchema={ validationSchema } onSubmit={ handleSubmit  }>
                    {({ dirty, isValid }) => (
                        <Form className="animate__animated animate__fadeIn">
                            <Field 
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="auth__input"
                                autoComplete="off"
                            />

                            <ErrorMessage name="name">
                                { msg => <small style={{ color: 'red' }}>{ msg }</small> }
                            </ErrorMessage>

                            <Field 
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="auth__input"
                                autoComplete="off"
                            />

                            <ErrorMessage name="email">
                                { msg => <small style={{ color: 'red' }}>{ msg }</small> }
                            </ErrorMessage>
            
                            <Field 
                                type="password"
                                placeholder="Password"
                                name="password1"
                                className="auth__input"
                            />

                            <ErrorMessage name="password1">
                                { msg => <small style={{ color: 'red' }}>{ msg }</small> }
                            </ErrorMessage>

                            <Field 
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                className="auth__input"
                            />
                            
                            <ErrorMessage name="password2">
                                { msg => <small style={{ color: 'red' }}>{ msg }</small> }
                            </ErrorMessage>
                            <br/>
            
                            <button
                                disabled={ !dirty || !isValid }
                                type="submit"
                                className="btn btn-primary btn-block mb-5">
                                Register
                            </button>
            
                            <Link 
                                to="/auth/login"
                                className="link">
                                Already registered?
                            </Link>

                        </Form>
                    )}
            </Formik>
        </>
    )
}
