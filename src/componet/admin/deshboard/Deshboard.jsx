import React, { useEffect, useState } from 'react'

import './Deshboardstyle.css'


import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, where, query } from "firebase/firestore";
import { app } from '../../../Firebase';

const db = getFirestore(app); // Initialize Firestore


const Deshboard = () => {


    const [orderarr, setOrderarr] = useState([]);

    //###################################################################### show all order start

    const showAllorder = async () => {
        console.log("Fetching all order...");

        try {
            const querySnapshot = await getDocs(collection(db, "order"));
            let productsArray = []; //  Temporary array to collect data

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() }); //  Store doc ID along with data
            });

            setOrderarr(productsArray); //  Update state once, instead of multiple times inside loop
            console.log("order:", productsArray);


        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Error fetching order:", error);
        }
    };

    useEffect(() => {
        showAllorder()
    }, []);
    //###################################################################### show all order end

    return (
        <div>

            <h2>Dashboard Overview</h2>

            <div className="row g-4 mt-3">
                <div className="col-md-3">
                    <div className="dashboard-card p-3 bg-white text-center shadow rounded">
                        <i className="fas fa-shopping-cart text-warning"></i>
                        <h5>Orders</h5>
                        <p>{orderarr.length}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card p-3 bg-white text-center shadow rounded">
                        <i className="fas fa-dollar-sign text-warning"></i>
                        <h5>Revenue</h5>
                        <p>$25,500</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card p-3 bg-white text-center shadow rounded">
                        <i className="fas fa-users text-warning"></i>
                        <h5>Users</h5>
                        <p>850</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card p-3 bg-white text-center shadow rounded">
                        <i className="fas fa-box text-warning"></i>
                        <h5>Products</h5>
                        <p>300</p>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between row my-5">
                <h4 className=" col-5" >Recent Orders</h4>
                <button className="btn btn-dark col-1" onClick={() => showAllorder()}><i className="fa-solid fa-arrows-rotate"></i></button>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orderarr.map((odr) => (
                            <tr key={odr.id}>
                                <td>#{odr.id}</td>
                                <td>{odr.name}</td>
                                <td><span className="badge bg-warning">Pending</span></td>
                                <td>₹{odr.total}</td>
                                <td>{odr.date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Deshboard
