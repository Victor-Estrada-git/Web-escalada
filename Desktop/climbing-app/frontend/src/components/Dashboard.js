import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Importa el archivo de estilos

function Dashboard() {
    const [metrics, setMetrics] = useState({
        totalAlumnos: 0,
        totalRutinas: 0,
        totalMensajes: 0,
        totalCompetencias: 0
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Aquí necesitarás enviar el token de autenticación
                // Por ahora, solo hacemos la llamada básica
                const res = await axios.get('http://localhost:5000/api/dashboard/metrics');
                setMetrics(res.data);
            } catch (err) {
                console.error('Error al obtener las métricas:', err);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, [Nombre del usuario]</h1>
            <p>Panel de control de la plataforma de Climbing</p>
            <div className="metrics-grid">
                <div className="metric-card">
                    <span className="metric-value">{metrics.totalAlumnos}</span>
                    <span className="metric-label">Total de Alumnos</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{metrics.totalRutinas}</span>
                    <span className="metric-label">Total de Rutinas</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{metrics.totalMensajes}</span>
                    <span className="metric-label">Total de Mensajes</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{metrics.totalCompetencias}</span>
                    <span className="metric-label">Total de Competencias</span>
                </div>
            </div>
            {/* Aquí irían los gráficos que se ven en tu diseño */}
        </div>
    );
}

export default Dashboard;