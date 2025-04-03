import React from 'react'
import './Warrantystyle.css'
const Warranty = () => {
    return (
        <div>
            <section className="warranty-section pt-5 ">
                <div className="container-fluid pt-4 px-5">
                    <div className="row align-items-center align-items-baseline">
                        <div className="col-md-8">
                            <h2 className="fw-bold">Warranty Registration</h2>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-danger fw-bold">Register Your Batteries!</h4>
                            <p className="fw-semibold m-0">It's simple, useful, and Paperless!</p>
                            <p className="bat-cont m-0">Register your Battery online and view your Battery warranty details anytime, anywhere!</p>
                        </div>
                    </div>
                </div>
            </section>



            <div className="container my-4">
                <div className="register-container">
                    <ul className="nav nav-tabs justify-content-center mb-4" id="warrantyTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab">Register Your Battery</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="view-tab" data-bs-toggle="tab" data-bs-target="#view" type="button" role="tab">View Registered Battery</button>
                        </li>
                    </ul>

                    <div className="tab-content mt-3" id="warrantyTabContent">
                        <div className="tab-pane fade show active" id="register" role="tabpanel">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Serial No."/>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="First Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div className="row g-3 mt-3">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Enter Pin Code"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" placeholder="Enter Battery Purchase Date"/>
                                    </div>
                                </div>
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control" placeholder="Enter Mobile Number"/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="agree"/>
                                        <label className="form-check-label" htmlFor="agree">I confirm to receive the acknowledgement of Battery registration and updates via WhatsApp/SMS</label>
                                </div>
                                <button type="submit" className="btn btn-register btn-dark">Register</button>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="view" role="tabpanel">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Serial No."/>
                                </div>
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control" placeholder="Enter Mobile Number"/>
                                </div>
                                <button type="submit" className="btn btn-dark btn-register">View Details</button>
                            </form>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    )
}

export default Warranty
