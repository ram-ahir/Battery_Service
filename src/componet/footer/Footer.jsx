import React from 'react'
import { useNavigate } from "react-router-dom";
import './Footerstyle.css'

const Footer = () => {
        const navigate = useNavigate();
    
    return (
        <div>
            <footer className="bg-dark text-white pt-5 pb-4 foot">
                <div className="container text-center text-md-start">
                    <div className="row">


                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Delta Battery Service</h5>
                            <p className="mb-1">We provide top-quality batteries and reliable services to keep your vehicle powered on the go.</p>
                        </div>


                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/")}>Home</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/findby")}>Battery Finder</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/warranty")}>Warranty Registration</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/dealer")}>Dealer Locator</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/service")}>Book Service</a></p>
                        </div>


                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Support</h5>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/contactus")}>Contact Us</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/blog")}>Blogs</a></p>
                            <p className="mb-1"><a className="text-white text-decoration-none" onClick={() => navigate("/cart")}>Cart</a></p>
                        </div>


                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Stay Connected</h5>
                            <div className="d-flex gap-3">
                                <a href="" className="text-white fs-4"><i className="fab fa-facebook-f"></i></a>
                                <a href="" className="text-white fs-4"><i className="fab fa-twitter"></i></a>
                                <a href="" className="text-white fs-4"><i className="fab fa-instagram"></i></a>
                                <a href="" className="text-white fs-4"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <p className="mt-3">Subscribe to our newsletter</p>
                            <div className="input-group">
                                <input type="email" className="form-control" placeholder="Your email" />
                                <button className="btn btn-danger">Subscribe</button>
                            </div>
                        </div>

                    </div>


                    <hr className="my-4 text-white" />
                    <div className="row text-center">
                        <p className="mb-0">&copy; 2025 DELTA Battery Service. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
