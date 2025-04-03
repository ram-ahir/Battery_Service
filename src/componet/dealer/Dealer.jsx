import React, { useEffect, useState } from 'react'
import './dealstyle.css'

import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, where, query } from "firebase/firestore";
import { app } from '../../Firebase';

const db = getFirestore(app); // Initialize Firestore


const Dealer = () => {
    const [serviceall, setServiceall] = useState([]);

    //###################################################################### ifram start


    const [lat, setLat] = useState("23.064184,72.529659"); // Default Latitude

    const setifram = (loc) => {
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
            showAll()
            return;
        }

        console.log("Fetching filtered Dealers...");

        try {
            let filters = collection(db, "Dealers");

            let conditions = [];
            if (fltpin) conditions.push(where("pincode", "==", fltpin));
            if (fltcity) conditions.push(where("city", "==", fltcity));

            const querySnapshot = await getDocs(query(filters, ...conditions));
            let productsArray = [];

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() });
            });

            setServiceall(productsArray);
            console.log("Filtered Dealers:", productsArray);

        } catch (error) {
            console.error("Error fetching Dealers:", error);
        }
    };


    //###################################################################### flt end


    //###################################################################### show all prod start

    const showAll = async () => {
        console.log("Fetching all Dealers...");

        try {
            const querySnapshot = await getDocs(collection(db, "Dealers"));
            let productsArray = []; //  Temporary array to collect data

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() }); //  Store doc ID along with data
            });

            setServiceall(productsArray); //  Update state once, instead of multiple times inside loop
            console.log("Dealers:", productsArray);


        } catch (error) {
            console.error("Error fetching Dealers:", error);
            toast.error("Error fetching Dealers:", error);
        }
    };

    useEffect(() => {
        showAll()
    }, []);
    //###################################################################### show all prod end

    return (
        <div>
            <div className="container-fluid pt-5 mb-5">

                <div className="container mt-4">
                    <h2 className="text-center mb-4">Find a Dealer Near You</h2>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="search" className="form-label">Search by Pin Code or City</label>
                                <input type="text" className="form-control mb-2" id="search" placeholder="Enter Pin Code" defaultValue="" onChange={e => setFltpin(e.target.value)} />
                                <input type="text" className="form-control" id="search" placeholder="Enter City" defaultValue="" onChange={e => setFltcity(e.target.value)} />
                            </div>
                            <button className="btn btn-dark w-100" onClick={filtertest}>Search</button>
                            <div className="mt-3">
                                <h5>Filters</h5>
                                <select className="form-select mb-2">
                                    <option >Sort by Distance</option>
                                    <option>Closest First</option>
                                    <option>Farthest First</option>
                                </select>
                                <select className="form-select mb-4">
                                    <option >Dealer Type</option>
                                    <option>Authorized Dealer</option>
                                    <option>Service Center</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="map rounded">
                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093646!2d144.95565121584416!3d-37.81732397975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0f6c9e7%3A0x2b1a9635a81b82cb!2sMelbourne%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1629335435782!5m2!1sen!2sus"
                            width="100%" height="400"></iframe> */}
                                <iframe
                                    src={`https://maps.google.com/maps?q=${lat}&hl=es&z=14&output=embed`}
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-4">Nearby Dealers</h3>
                    <div className="list-group">
                        <div className="list-group-item dealer-card">
                            <h5 className="mb-1">ABC Batteries</h5>
                            <p className="mb-1">123 Street, City, State - 456789</p>
                            <small><i className="fas fa-map-marker-alt"></i> 2.5 km away</small>
                        </div>
                        {serviceall.map((srv, index) => (
                            <div className="list-group-item dealer-card" key={srv.id} onClick={() => setifram(srv.location)}>
                                <h5 className="mb-1">{srv.name}</h5>
                                <p className="mb-1">{srv.address}, {srv.city}, {srv.pincode}</p>
                                <small><i className="fas fa-map-marker-alt"></i> {srv.location}</small>
                            </div>

                        ))}
                    </div>
                </div>



            </div>


        </div>
    )
}

export default Dealer
