import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <section className="auth__box-container">
                <Routes>
                    <Route path="login" element={ <LoginPage /> } />
                    <Route path="register" element={ <RegisterPage /> } />
                    <Route path="/" element={ <Navigate to="login" /> } />

                    {/* <Route path="/" element={ <LoginPage /> } /> */}
                </Routes>
            </section>
        </div>
    )
}