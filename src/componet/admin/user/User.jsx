import React, { useEffect, useState } from 'react'
import './Userstyle.css'
import { collection, getDocs } from 'firebase/firestore';
import db from '../../../Firebase';
const User = () => {
    const [serviceall, setServiceall] = useState([]);

    //###################################################################### show all prod start

    const showAll = async () => {
        console.log("Fetching all Service...");

        try {
            const querySnapshot = await getDocs(collection(db, "user"));
            let productsArray = []; //  Temporary array to collect data

            querySnapshot.forEach((doc) => {
                productsArray.push(doc.id); //  Store doc ID along with data
            });

            setServiceall(productsArray); //  Update state once, instead of multiple times inside loop
            console.log("Service:", productsArray);


        } catch (error) {
            console.error("Error fetching service:", error);
            toast.error("Error fetching service:", error);
        }
    };

    useEffect(() => {
        showAll()
    }, []);
    //###################################################################### show all prod end

    return (
        <div>


            <div className="container mt-4">
                <h2 className="mb-4">Users Management</h2>

                <button className="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#addUserModal">
                    <i className="fas fa-user-plus"></i> Add New User
                </button>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Search User..." />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select">
                            <option >Filter by Role</option>
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>  
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>john.doe@example.com</td>
                                <td>Admin</td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td className="action-icons">
                                    <i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#editUserModal"></i>
                                    <i className="fas fa-trash delete"></i>
                                </td>
                            </tr> */}
                            {serviceall.map((id, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{id}</td>
                                    <td>Admin</td>
                                    <td><span className="badge bg-success">Active</span></td>
                                    <td className="action-icons">
                                        <i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#editUserModal"></i>
                                        <i className="fas fa-trash delete"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Add New User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select className="form-select">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success w-100">Add User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUserModalLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" defaultValue={"John Doe"} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" defaultValue={"john.doe@example.com"} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select className="form-select">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-warning w-100">Update User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default User
