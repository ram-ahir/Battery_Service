import React, { useRef, useState } from 'react'
import './Blogstyle.css'
import { useNavigate } from "react-router-dom";
const Blog = () => {

    const navigate = useNavigate();

    const voltageInputRef = useRef(null);
    const [healthMessage, setHealthMessage] = useState("");

    const checkBatteryHealth = () => {
        const voltage = parseFloat(voltageInputRef.current.value);
        let message = "Please enter a valid voltage.";

        if (!isNaN(voltage)) {
            if (voltage >= 12.6) {
                message = "✅ Battery is healthy.";
            } else if (voltage >= 12.0) {
                message = "⚠️ Battery is weak, consider recharging.";
            } else {
                message = "❌ Battery is low! Needs immediate replacement.";
            }
        }

        setHealthMessage(message); // ✅ Update state instead of using document.getElementById()
    };

    return (
        <div>
            <div className="container pt-5">

                <div className='pt-4'></div>
                <div className="hero-section bg-dark text-white pt-5">
                    <h1>Battery Testing & Diagnostics</h1>
                    <p>Learn how to check and diagnose battery issues with expert tips and guides.</p>
                </div>
                <div className="container my-5">
                    <h2 className="text-center mb-4">Latest Blog Articles</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card blog-card">
                                <img src={"http://clickandcall.spectricssolutions.com/apilist/uploads/blg1.webp"||"sec-2.jpg"} className="card-img-top" alt="Battery Guide" />
                                <div className="card-body">
                                    <h5 className="card-title">How to Check Your Battery Voltage</h5>
                                    <p className="card-text">Learn how to measure battery voltage using a multimeter.</p>
                                    <a className="btn btn-dark" onClick={() => navigate("/blog1")}>Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card blog-card">
                                <img src={"http://clickandcall.spectricssolutions.com/apilist/uploads/blg2.webp"||"sec-2.jpg"} className="card-img-top" alt="Battery Maintenance" />
                                <div className="card-body">
                                    <h5 className="card-title">Battery Maintenance Tips</h5>
                                    <p className="card-text">Simple steps to extend your battery's lifespan.</p>
                                    <a className="btn btn-dark" onClick={() => navigate("/blog2")}>Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card blog-card">
                                <img src={"http://clickandcall.spectricssolutions.com/apilist/uploads/blg3.webp"||"sec-2.jpg"} className="card-img-top" alt="Battery Warning Signs" />
                                <div className="card-body">
                                    <h5 className="card-title">Signs Your Battery Needs Replacement</h5>
                                    <p className="card-text">Recognize when it's time to change your car battery.</p>
                                    <a className="btn btn-dark" onClick={() => navigate("/blog3")}>Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-5">
                    <h2 className="text-center mb-4">Video Tutorials</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/VIDEO_ID" allowFullScreen></iframe>
                        </div>
                        <div className="col-md-6">
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/VIDEO_ID" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
     

                <div className="container my-5">
                    <h2 className="text-center mb-4">Battery Health Checker</h2>
                    <form className="p-4 border rounded bg-light">
                        <div className="mb-3">
                            <label htmlFor="voltageInput" className="form-label">Enter Battery Voltage (V):</label>
                            <input type="number" className="form-control" id="voltageInput" ref={voltageInputRef} placeholder="e.g. 12.6" />
                        </div>
                        <button type="button" className="btn btn-dark w-100" onClick={checkBatteryHealth}>
                            Check Battery Health
                        </button>
                        <p className="mt-3 text-center fw-bold">{healthMessage}</p> {/* ✅ Display result using state */}
                    </form>
                </div>

                <div className="container my-5">
                    <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h5>🔋 How do I know if my battery is bad?</h5>
                        <p>If your battery doesn’t hold charge or your car struggles to start, it might be time to replace it.</p>
                    </div>
                    <div className="faq-item">
                        <h5>⚡ What voltage is a healthy car battery?</h5>
                        <p>A fully charged car battery should read around 12.6V when the car is off.</p>
                    </div>
                    <div className="faq-item">
                        <h5>🔌 How often should I check my battery?</h5>
                        <p>It’s recommended to check your battery health every 3 months.</p>
                    </div>
                </div>

               

            </div>
        </div>
    )
}

export default Blog
