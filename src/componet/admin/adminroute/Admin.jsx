import React from 'react'
import Menu from '../admin-menu/menu'
import './Adminstyle.css'
import Deshboard from '../deshboard/Deshboard'
import Product from '../product/Product'
import User from '../user/user'
import Dealer from '../dealer/Dealer'
import Service from '../service/Service'
import { Route, Routes } from 'react-router-dom'

const Admin = () => {

    return (
        <div>
            <Menu />
            <main className="content" id="content">
                <Routes>
                    <Route path='dashboard' element={<Deshboard/>}/>
                    <Route path='product' element={<Product/>}/>
                    <Route path='order' element={<Deshboard/>}/>
                    <Route path='user' element={<User/>}/>
                    <Route path='service' element={<Service/>}/>
                    <Route path='dealer' element={<Dealer/>}/>
                    <Route path='settings' element={<Deshboard/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default Admin
