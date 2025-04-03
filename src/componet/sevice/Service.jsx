import React, { useEffect, useState } from 'react'
import './Servstyle.css'

import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, where, query } from "firebase/firestore";
import { app } from '../../Firebase';

const db = getFirestore(app); // Initialize Firestore




const Service = () => {
    const [serviceall, setServiceall] = useState([]);

    //###################################################################### ifram start


    const [lat, setLat] = useState("23.064184,72.529659"); // Default Latitude

    const setifram = (loc) =>{
        console.log(loc)
        setLat(loc);
    };

    //###################################################################### ifram end





    //###################################################################### flt start

    const [fltpin, setFltpin] = useState("");
    const [fltcity, setFltcity] = useState("");

    const filtertest = async () => {
        console.log(fltpin, fltcity);

        if (!fltpin && !fltcity) {
            toast.warn("Please select at least one fild");
            return;
        }

        console.log("Fetching filtered Services...");

        try {
            let filters = collection(db, "Services");

            let conditions = [];
            if (fltpin) conditions.push(where("pincode", "==", fltpin));
            if (fltcity) conditions.push(where("city", "==", fltcity));

            const querySnapshot = await getDocs(query(filters, ...conditions));
            let productsArray = [];

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() });
            });

            setServiceall(productsArray);
            console.log("Filtered Services:", productsArray);

        } catch (error) {
            console.error("Error fetching Services:", error);
        }
    };


    //###################################################################### flt end


    //###################################################################### show all prod start

    const showAll = async () => {
        console.log("Fetching all Service...");

        try {
            const querySnapshot = await getDocs(collection(db, "Services"));
            let productsArray = []; //  Temporary array to collect data

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() }); //  Store doc ID along with data
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
            <div className="container-fluid pt-5 mb-5">

                <div className="container mt-5">
                    <h2 className="text-center">Service Booking</h2>
                    <p className="text-center">Find a service center and book an appointment.</p>

                    <div className="card p-4 mb-4">
                        <h5>Find a Service Center</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control" id="pin-code" placeholder="Enter PIN Code" defaultValue="" onChange={e => setFltpin(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" id="city" placeholder="Enter City" defaultValue="" onChange={e => setFltcity(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-dark w-100" onClick={filtertest}>Search</button>
                            </div>
                        </div>
                    </div>

                    <div id="map">
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093646!2d144.95565121584416!3d-37.81732397975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0f6c9e7%3A0x2b1a9635a81b82cb!2sMelbourne%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1629335435782!5m2!1sen!2sus"
                            width="100%" height="350"></iframe> */}

                       
                        <iframe
                            src={`https://maps.google.com/maps?q=${lat}&hl=es&z=14&output=embed`}
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy">
                        </iframe>
                    </div>

                    <h3 className="mt-4">Nearby Service Center</h3>
                    <div className="list-group">
                        <div className="list-group-item dealer-card">
                            <h5 className="mb-1">ABC Batteries</h5>
                            <p className="mb-1">123 Street, City, State - 456789</p>
                            <small><i className="fas fa-map-marker-alt"></i> 2.5 km away</small>
                            <button className="btn btn-dark w-100" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Book Service</button>

                        </div>
                        {serviceall.map((srv, index) => (
                            <div className="list-group-item dealer-card" key={srv.id} onClick={()=>setifram(srv.location)}>
                                <h5 className="mb-1">{srv.name}</h5>
                                <p className="mb-1">{srv.address}, {srv.city}, {srv.pincode}</p>
                                <small><i className="fas fa-map-marker-alt"></i> {srv.location}</small>
                                <button className="btn btn-dark w-100" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Book Service</button>

                            </div>

                        ))}
                    </div>



                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="container h-100">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Book a Service Appointment</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control mb-3" placeholder="Your Name" required />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" className="form-control mb-3" placeholder="Your Email" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control mb-3" placeholder="Vehicle Model" required />
                                                </div>
                                                <div className="col-md-6">
                                                    <select className="form-control mb-3">
                                                        <option>Select Battery Issue</option>
                                                        <option>Battery Not Charging</option>
                                                        <option>Low Voltage</option>
                                                        <option>Battery Replacement</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="date" className="form-control mb-3" required />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="time" className="form-control mb-3" required />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-dark w-100">Book Now</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>





                </div>

            </div>
        </div>
    )
}

export default Service
