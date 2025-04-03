import React from 'react'
import './Blog2style.css'
const Blog2 = () => {
    return (
        <div>
            <div className="py-5"></div>
            <div className="hero-section bg-dark text-white">
                <h1>Battery Maintenance Tips</h1>
                <p>Extend your battery's life with these essential maintenance tips.</p>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Top Battery Maintenance Tips</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="tip-card text-center">
                            <i className="fas fa-battery-full tip-icon"></i>
                            <h5 className="mt-3">Keep Battery Charged</h5>
                            <p>Ensure your battery stays charged, especially if your car is unused for long periods.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="tip-card text-center">
                            <i className="fas fa-broom tip-icon"></i>
                            <h5 className="mt-3">Clean Battery Terminals</h5>
                            <p>Regularly remove corrosion from battery terminals using baking soda and water.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="tip-card text-center">
                            <i className="fas fa-thermometer-half tip-icon"></i>
                            <h5 className="mt-3">Protect from Extreme Temperatures</h5>
                            <p>Hot and cold weather can affect battery performance. Park in shaded areas when possible.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Do’s & Don’ts of Battery Maintenance</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="text-success">✅ Do’s</h4>
                        <ul>
                            <li>Check battery voltage regularly.</li>
                            <li>Secure battery tightly to avoid vibrations.</li>
                            <li>Use a battery charger when storing for long periods.</li>
                            <li>Inspect for leaks and corrosion.</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-danger">❌ Don’ts</h4>
                        <ul>
                            <li>Don’t let your battery drain completely.</li>
                            <li>Don’t use tap water to refill battery cells.</li>
                            <li>Don’t leave headlights on when the engine is off.</li>
                            <li>Don’t ignore warning signs of a weak battery.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Watch the Video Guide</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h5>🔋 How often should I check my battery?</h5>
                    <p>It’s recommended to check your battery at least once every 3 months.</p>
                </div>
                <div className="faq-item">
                    <h5>⚡ Can extreme temperatures affect my battery?</h5>
                    <p>Yes! Heat can evaporate battery fluid, while cold weather slows chemical reactions.</p>
                </div>
                <div className="faq-item">
                    <h5>🔌 What happens if I don’t clean my battery terminals?</h5>
                    <p>Corrosion build-up can weaken electrical connections and cause starting problems.</p>
                </div>
            </div>
        </div>
    )
}

export default Blog2
