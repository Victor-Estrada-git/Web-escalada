import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Importamos el archivo de estilos

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        try {
            const res = await axios.post(url, formData);
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                console.log('Login exitoso:', res.data.user);
                navigate('/dashboard'); // Redirige al dashboard
            } else {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsLogin(true);
            }
        } catch (err) {
            console.error('Error:', err.response.data.msg);
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                    )}
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                    <button type="submit">{isLogin ? 'Entrar' : 'Crear Cuenta'}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
                </p>
                <div className="social-login-container">
                    <a href="http://localhost:5000/api/auth/google">
                        <button className="social-button google">Iniciar con Google</button>
                    </a>
                    <a href="http://localhost:5000/api/auth/facebook">
                        <button className="social-button facebook">Iniciar con Facebook</button>
                    </a>
                 </div>
            </div>
        </div>
    );
}

export default Auth;