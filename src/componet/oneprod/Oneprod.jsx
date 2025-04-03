import React, { useEffect, useState } from 'react'
import './Oneprodstyle.css'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../Firebase';
const Oneprod = () => {
    const { id } = useParams();
    const [battery, setBattery] = useState({});

    useEffect(() => {
        const getbat = async () => {

            const docRef = doc(db, "battery", id.toString());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBattery(docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        getbat()
    }, [])


    return (
        <div>
            <div className="mainsec pt-5 container">
                <div className="row mt-5" id="batteryResults">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-12">
                                <div className="card product-card p-2 shadow mx-3">
                                    <img src={battery.imageUrl||"/sec-2.jpg"} className="product-img mb-2 mb-lg-0" alt="Product" />
                                    <div className="secimg me-2">
                                        <div className="sec-img d-flex flex-row flex-lg-column px-lg-2">
                                            <img src="/sec-2.jpg" className="product-img2 mb-lg-1 me-2" alt="Product" />
                                            <img src="/sec-2.jpg" className="product-img2 mt-lg-1" alt="Product" />

                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <h5 className="card-title fw-bolder">Battery Model {battery.model}</h5>
                                        <p className="mb-0 fs-6"><b>Capacity:</b> {battery.capacity}</p>
                                        <p className="mb-0 fs-6"><b>Voltage: </b>{battery.voltage}</p>
                                        <p className="mb-2 fs-6"><b>Warranty:</b> {battery.warranty}</p>
                                        <p className="mb-2 fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis dolor repellendus natus quae! Ullam, quia mollitia? Ducimus corporis corrupti incidunt commodi, nobis explicabo minus sunt quasi, asperiores eum, ad adipisci.</p>
                                        <h5 className="text-success fw-bold">{battery.price}</h5>
                                        <button className="btn btn-dark mt-4">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-4">
                <h4 className="fw-bold">Customer Reviews</h4>

                <div className="review-card d-flex align-items-center">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="John Smith" className="user-img" />
                    <div className="review-content">
                        <h6 className="mb-1 fw-bold">John Smith</h6>
                        <div className="star-rating mb-1">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <p className="mb-0">This battery has exceeded my expectations. The installation was straightforward, and it has been performing flawlessly for months.</p>
                    </div>
                </div>

                <div className="review-card d-flex align-items-center">
                    <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Emily Johnson" className="user-img" />
                    <div className="review-content">
                        <h6 className="mb-1 fw-bold">Emily Johnson</h6>
                        <div className="star-rating mb-1">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <p className="mb-0">Great purchase! The delivery was quick, and the battery is of excellent quality. Highly recommend.</p>
                    </div>
                </div>
                <div className="review-card d-flex align-items-center">
                    <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Emily Johnson" className="user-img" />
                    <div className="review-content">
                        <h6 className="mb-1 fw-bold">Emily Johnson</h6>
                        <div className="star-rating mb-1">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <p className="mb-0">Great purchase! The delivery was quick, and the battery is of excellent quality. Highly recommend.</p>
                    </div>
                </div>

            </div>



            <div className="container my-5">
                <h2 className=" mb-4">Related products</h2>

                <div className="row g-4 sagest">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card product-card">
                            <img src="/sec-2.jpg" className="product-img" alt="Battery" />
                            <div className="card-body">
                                <h5 className="card-title">Battery Model X123</h5>
                                <p className="mb-0 fs-6"><b>Capacity:</b> 70 Ah</p>
                                <p className="mb-0 fs-6"><b>Voltage: </b>12V</p>
                                <p className="mb-2 fs-6"><b>Warranty:</b> 2 Years</p>
                                <h5 className="text-dark">$199.99</h5>
                                <button className="btn btn-dark w-100">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card product-card">
                            <img src="/sec-2.jpg" className="product-img" alt="Battery" />
                            <div className="card-body">
                                <h5 className="card-title">Battery Model X123</h5>
                                <p className="mb-0 fs-6"><b>Capacity:</b> 70 Ah</p>
                                <p className="mb-0 fs-6"><b>Voltage: </b>12V</p>
                                <p className="mb-2 fs-6"><b>Warranty:</b> 2 Years</p>
                                <h5 className="text-dark">$199.99</h5>
                                <button className="btn btn-dark w-100">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card product-card">
                            <img src="/sec-2.jpg" className="product-img" alt="Battery" />
                            <div className="card-body">
                                <h5 className="card-title">Battery Model X123</h5>
                                <p className="mb-0 fs-6"><b>Capacity:</b> 70 Ah</p>
                                <p className="mb-0 fs-6"><b>Voltage: </b>12V</p>
                                <p className="mb-2 fs-6"><b>Warranty:</b> 2 Years</p>
                                <h5 className="text-dark">$199.99</h5>
                                <button className="btn btn-dark w-100">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card product-card">
                            <img src="/sec-2.jpg" className="product-img" alt="Battery" />
                            <div className="card-body">
                                <h5 className="card-title">Battery Model X123</h5>
                                <p className="mb-0 fs-6"><b>Capacity:</b> 70 Ah</p>
                                <p className="mb-0 fs-6"><b>Voltage: </b>12V</p>
                                <p className="mb-2 fs-6"><b>Warranty:</b> 2 Years</p>
                                <h5 className="text-dark">$199.99</h5>
                                <button className="btn btn-dark w-100">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Oneprod
