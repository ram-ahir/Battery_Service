import React from 'react'
import './Blog1style.css'
const Blog1 = () => {
    return (
        <div>
            <div className="py-5"></div>
            <div className="hero-section bg-dark text-white ">
                <h1>How to Check Your Battery Voltage</h1>
                <p>Learn how to accurately test your battery voltage using a multimeter.</p>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Step-by-Step Guide</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="step-card text-center">
                            <i className="fas fa-car-battery step-icon"></i>
                            <h5 className="mt-3">Step 1: Prepare Your Car</h5>
                            <p>Turn off the engine and remove any accessories to ensure an accurate reading.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step-card text-center">
                            <i className="fas fa-tools step-icon"></i>
                            <h5 className="mt-3">Step 2: Get a Multimeter</h5>
                            <p>Set your multimeter to **DC voltage (V)** and select the 20V range.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step-card text-center">
                            <i className="fas fa-bolt step-icon"></i>
                            <h5 className="mt-3">Step 3: Connect the Probes</h5>
                            <p>Touch the **red probe to the positive terminal** and the **black probe to the negative terminal**.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step-card text-center">
                            <i className="fas fa-tachometer-alt step-icon"></i>
                            <h5 className="mt-3">Step 4: Read the Voltage</h5>
                            <p>If the reading is **12.6V or higher**, your battery is healthy. Below 12V means it needs charging.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step-card text-center">
                            <i className="fas fa-exclamation-triangle step-icon"></i>
                            <h5 className="mt-3">Step 5: Take Action</h5>
                            <p>If the voltage is **too low**, recharge or replace your battery as soon as possible.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Watch the Video Tutorial</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h5>🔋 What is the normal voltage for a car battery?</h5>
                    <p>A fully charged car battery should read around **12.6V to 12.8V** when the car is off.</p>
                </div>
                <div className="faq-item">
                    <h5>⚡ What if my battery voltage is below 12V?</h5>
                    <p>A battery reading **below 12V** means it’s weak and needs charging or replacement.</p>
                </div>
                <div className="faq-item">
                    <h5>🔌 Can I check the voltage without a multimeter?</h5>
                    <p>Some vehicles show battery voltage in the dashboard, but a multimeter is the most accurate method.</p>
                </div>
            </div>

        </div>
    )
}

export default Blog1
