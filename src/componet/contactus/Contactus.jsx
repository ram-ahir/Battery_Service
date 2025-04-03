import React from 'react'
import './Contactusstyle.css'
const Contactus = () => {
    return (
        <div className='pt-5'>
        <div className='pt-4'></div>
            
            <div className="hero-section bg-dark text-white">
                <h1>Contact Us</h1>
                <p>We're here to help! Reach out to us for any inquiries or support.</p>
            </div>

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Get in Touch</h2>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" placeholder="Enter your phone number"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea className="form-control" rows="4" placeholder="Write your message here"></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark w-100">Send Message</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="contact-info">
                            <h2>Contact Information</h2>
                            <p><i className="fas fa-map-marker-alt"></i> 123 Battery Street, New York, USA</p>
                            <p><i className="fas fa-envelope"></i> support@batteryservice.com</p>
                            <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
                            <hr/>
                                <h5>Follow Us</h5>
                                <div>
                                    <a href="#" className="text-dark me-3"><i className="fab fa-facebook"></i></a>
                                    <a href="#" className="text-dark me-3"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="text-dark me-3"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="text-dark"><i className="fab fa-linkedin"></i></a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Our Location</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093646!2d144.95565121584416!3d-37.81732397975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0f6c9e7%3A0x2b1a9635a81b82cb!2sMelbourne%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1629335435782!5m2!1sen!2sus"
                    width="100%" height="350"></iframe>
            </div>

        </div>
    )
}

export default Contactus
