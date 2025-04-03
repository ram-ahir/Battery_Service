import React from 'react'
import './Blog3style.css'
const Blog3 = () => {
    return (
        <div>
            <div className="py-5"></div>
            <div className="hero-section bg-dark text-white">
                <h1>Signs Your Battery Needs Replacement</h1>
                <p>Don’t get stranded! Look out for these warning signs before your battery fails.</p>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Common Warning Signs</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-car-crash sign-icon"></i>
                            <h5 className="mt-3">Slow Engine Start</h5>
                            <p>Your car takes longer to start, indicating a weak battery.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-battery-quarter sign-icon"></i>
                            <h5 className="mt-3">Low Battery Charge</h5>
                            <p>Frequent low voltage readings mean it’s time to replace.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-exclamation-circle sign-icon"></i>
                            <h5 className="mt-3">Dashboard Warning Light</h5>
                            <p>Your car’s battery light stays on, signaling trouble.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-cloud-meatball sign-icon"></i>
                            <h5 className="mt-3">Battery Corrosion</h5>
                            <p>Excess corrosion on terminals weakens electrical flow.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-thermometer-full sign-icon"></i>
                            <h5 className="mt-3">Swollen Battery Case</h5>
                            <p>Heat exposure can cause your battery to expand.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sign-card text-center">
                            <i className="fas fa-car-battery sign-icon"></i>
                            <h5 className="mt-3">Frequent Jump Starts</h5>
                            <p>Needing multiple jump starts means a failing battery.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Watch the Video Guide</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/vMw0-1yyJAg?si=DVpLaufej8HN1hLX" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h5>🔋 How long does a car battery last?</h5>
                    <p>Most car batteries last between **3 to 5 years**, depending on usage and conditions.</p>
                </div>
                <div className="faq-item">
                    <h5>⚡ What happens if I ignore battery warning signs?</h5>
                    <p>If you ignore the signs, your car may not start unexpectedly, leaving you stranded.</p>
                </div>
                <div className="faq-item">
                    <h5>🔌 Can I replace my car battery myself?</h5>
                    <p>Yes! If you have basic tools, you can replace it yourself or visit a service center.</p>
                </div>
            </div>
        </div>
    )
}

export default Blog3
