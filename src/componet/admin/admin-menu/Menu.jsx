import React from 'react'
import './Menustyle.css'
import { NavLink } from 'react-router-dom';
const Menu = () => {
    
        const toggleSidebar = () => {
            document.getElementById("sidebar").classList.toggle("hide");
            document.getElementById("content").classList.toggle("full");
        }
    return (
        <div>
            <nav className="sidebar" id="sidebar">
                <h4 className="text-center">Admin Panel</h4>
                <NavLink to='/admin/dashboard'><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink>
                <NavLink to='/admin/product'><i className="fas fa-box"></i> Products</NavLink>
                <NavLink to='/admin/order'><i className="fas fa-shopping-cart"></i> Orders</NavLink>
                <NavLink to='/admin/user'><i className="fas fa-users"></i> Users</NavLink>
                <NavLink to='/admin/service'><i className="fas fa-tools"></i> Services</NavLink>
                <NavLink to='/admin/dealer'><i className="fas fa-store"></i> Dealers</NavLink>
                <NavLink to='/admin/settings'><i className="fas fa-cog"></i> Settings</NavLink>
            </nav>

            <button className="toggle-btn bg-dark text-center py-0" onClick={toggleSidebar}>☰</button>

        </div>
    )
}

export default Menu
