import React from 'react'
import './Homestyle.css'
import Swp from './swiper/Swp'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container-fluid out-main">
                <div className="section-1 pt-5">
                    <div className="container-fluid sec1 d-flex justify-content-center align-items-center flex-column p-3">
                        <div className="container-fluid img p-0 rounded-4">

                        </div>
                        <div className="container-fluid cont p-0 d-flex justify-content-center align-items-center flex-column text-center mt-4">
                            <p className="heading poppins-bold fs-2">Welcome to <u>Delta</u> Battery Services</p>
                            <p className="poppins-regular headcont  lh-sm">Your one-stop solution for all battery needs. From expert recommendations to hassle-free installation, we keep you powered on the go with top-quality batteries and reliable services.</p>
                        </div>
                    </div>
                </div>


                <div className="section-2">
                    <div className="hline1 container-fluid d-flex align-items-center justify-content-start">
                        <div className="img1 ms-2 w-25 rounded-4" style={{backgroundImage:"url(productsec.jpg)"}}></div>
                        <div className="w-75">
                            <div className="cont1 ms-2">
                                <p className="heading poppins-bold fs-3">Products</p>
                                <p className="poppins-regular headcont lh-sm">Discover our premium batteries for cars, bikes, and industrial use, easily find the perfect fit with our smart search, and compare detailed specifications for long-lasting performance.</p>
                                <div className="bt text-center">
                                    <button className="btn btn-dark" onClick={() => navigate("/allproduct")}>Lern more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-3">
                    <div className="hline2 container-fluid d-flex align-items-center justify-content-end flex-row-reverse w-100">
                        <div className="img2 me-2 w-25 rounded-4 " style={{backgroundImage:"url(bookservice.jpg)"}}></div>
                        <div className="w-75">
                            <div className="cont2 me-2 text-end float-end">
                                <p className="heading poppins-bold fs-3">Book Servicess</p>
                                <p className="poppins-regular headcont lh-sm">Easily book a battery checkup, replacement, or installation at your nearest service center, choose a convenient date and time, and ensure your vehicle stays powered with expert service.</p>
                                <div className="bt text-center">
                                    <button className="btn btn-dark" onClick={() => navigate("/service")}>Lern more</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-2">
                    <div className="hline1 container-fluid d-flex align-items-center justify-content-start">
                        <div className="img1 ms-2 w-25 rounded-4" style={{backgroundImage:"url(dealerfind.jpg)"}}></div>
                        <div className="w-75">
                            <div className="cont1 ms-2">
                                <p className="heading poppins-bold fs-3">Dealer</p>
                                <p className="poppins-regular headcont lh-sm">Quickly locate authorized battery dealers near you, search by PIN code, city, or state, and get the best battery services from trusted professionals</p>
                                <div className="bt text-center">
                                    <button className="btn btn-dark" onClick={() => navigate("/dealer")}>Lern more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-3">
                    <div className="hline2 container-fluid d-flex align-items-center justify-content-end flex-row-reverse w-100">
                        <div className="img2 me-2 w-25 rounded-4 " style={{backgroundImage:"url(warranty.jpg)"}}></div>
                        <div className="w-75">
                            <div className="cont2 me-2 text-end float-end">
                                <p className="heading poppins-bold fs-3">Warranty</p>
                                <p className="poppins-regular headcont lh-sm">Easily register your battery warranty online, access warranty details anytime, and ensure hassle-free claims for a worry-free experience.</p>
                                <div className="bt text-center">
                                    <button className="btn btn-dark" onClick={() => navigate("/warranty")}>Lern more</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-2">
                    <div className="hline1 container-fluid d-flex align-items-center justify-content-start">
                        <div className="img1 ms-2 w-25 rounded-4" style={{backgroundImage:"url(blogs.jpg)"}}></div>
                        <div className="w-75">
                            <div className="cont1 ms-2">
                                <p className="heading poppins-bold fs-3">Blogs</p>
                                <p className="poppins-regular headcont lh-sm">Explore expert battery tips, learn maintenance and troubleshooting techniques, and stay updated with the latest battery care guides.</p>
                                <div className="bt text-center">
                                    <button className="btn btn-dark" onClick={() => navigate("/blog")}>Lern more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                


                <div className="why-us container-fluid">
                    <div className="container why-choose-section">
                        <h2>Why Choose Us?</h2>
                        <div className="row g-4 mt-4">

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-clock feature-icon"></i>
                                    <h5>Save Time & Effort</h5>
                                    <p>Get the perfect battery recommendations quickly, reducing search time.</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-shield-alt feature-icon"></i>
                                    <h5>Trusted & Reliable</h5>
                                    <p>We offer only high-quality batteries with genuine warranties.</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-tools feature-icon"></i>
                                    <h5>Easy Installation</h5>
                                    <p>Find nearby service centers for battery installation and support.</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-truck feature-icon"></i>
                                    <h5>Fast & Secure Delivery</h5>
                                    <p>Get your battery delivered to your doorstep with easy tracking.</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-money-bill-wave feature-icon"></i>
                                    <h5>Affordable Pricing</h5>
                                    <p>Competitive pricing with no hidden charges for the best value.</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="feature-box text-center">
                                    <i className="fas fa-headset feature-icon"></i>
                                    <h5>24/7 Customer Support</h5>
                                    <p>Our team is available anytime to assist you with your battery needs.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <Swp />

            </div>


        </div>
    )
}

export default Home
