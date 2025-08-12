import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Panel Admin</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/users">Gestión de alumnos</Link></li>
        <li><Link to="/competitions">Registrar competencia</Link></li>
        <li><Link to="/routines">Crear Rutina</Link></li>
        <li><Link to="/messages">Mensajes</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;