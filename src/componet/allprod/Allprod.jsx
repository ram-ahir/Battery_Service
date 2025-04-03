import React, { useEffect, useRef, useState } from 'react'
import './Allprodstyle.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { getFirestore, doc, setDoc, getDocs, getDoc, collection, query, where } from "firebase/firestore";
import { app } from '../../Firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);
const Allprod = () => {

    // ################################################################# add cart st
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email); // Set user email
            } else {
                setEmail(null); // No user logged in
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const addcart = async (id) => {

        try {
            await setDoc(doc(db, "user", email), {
                [id]: 1

            }, { merge: true });
            toast.success(id+" Added");
            // window.location.reload();

        } catch (error) {
            toast.error("Error to add")
        }
    };

    // ################################################################# add cart end




    const navigate = useNavigate();




    const [productall, setProductall] = useState([]);
    const [fltcapacity, setFltcapacity] = useState("");
    const [fltvoltage, setFltvoltage] = useState("");
    const [fltwarranty, setFltwarranty] = useState("");

    const showAll = async () => {
        console.log("Fetching all products...");

        try {
            const querySnapshot = await getDocs(collection(db, "battery"));
            let productsArray = []; // ✅ Temporary array to collect data

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() }); // ✅ Store doc ID along with data
            });

            setProductall(productsArray); // ✅ Update state once, instead of multiple times inside loop
            console.log("Products:", productsArray);


        } catch (error) {
            console.error("Error fetching products:", error);
        }
        console.log(productall)
    };
    useEffect(() => {
        showAll();
    }, [])



    const filtertest1 = async () => {
        console.log(fltcapacity, fltvoltage, fltwarranty);
        if (fltcapacity == "" || fltvoltage == "" || fltwarranty == "") {
            toast.warn("please select all field")
            if (!fltcapacity) {
                console.log("work")
            }
        }
        else {
            console.log("Fetching all products...");

            try {
                const querySnapshot = await getDocs(query(collection(db, "battery"), where("capacity", "==", fltcapacity), where("voltage", "==", fltvoltage), where("warranty", "==", fltwarranty)));
                let productsArray = []; //  Temporary array to collect data

                querySnapshot.forEach((doc) => {
                    productsArray.push({ id: doc.id, ...doc.data() }); //  Store doc ID along with data
                });

                setProductall(productsArray); // Update state once, instead of multiple times inside loop
                console.log("Products:", productsArray);


            } catch (error) {
                console.error("Error fetching products:", error);
            }
            console.log(productall)
        }
    };
    const filtertest = async () => {
        console.log(fltcapacity, fltvoltage, fltwarranty);

        if (!fltcapacity && !fltvoltage && !fltwarranty) {
            toast.warn("Please select at least one filter");
            return;
        }

        console.log("Fetching filtered products...");

        try {
            let filters = collection(db, "battery");

            let conditions = [];
            if (fltcapacity) conditions.push(where("capacity", "==", fltcapacity));
            if (fltvoltage) conditions.push(where("voltage", "==", fltvoltage));
            if (fltwarranty) conditions.push(where("warranty", "==", fltwarranty));

            const querySnapshot = await getDocs(query(filters, ...conditions));
            let productsArray = [];

            querySnapshot.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() });
            });

            setProductall(productsArray);
            console.log("Filtered Products:", productsArray);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };








    return (
        <div>
            <div className="main-sec py-5">
                <div className="container mt-4">
                    <h2 className="text-center mb-4">All Products</h2>

                    <div className="filter-section">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="capacity" className="form-label">Capacity (Ah)</label>
                                        <select id="capacity" className="form-select" onChange={e => setFltcapacity(e.target.value)}>
                                            <option value="">Choose..</option>
                                            <option value="40Ah">40Ah</option>
                                            <option value="50Ah">50Ah</option>
                                            <option value="60Ah">60Ah</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="voltage" className="form-label">Voltage (V)</label>
                                        <select id="voltage" className="form-select" onChange={e => setFltvoltage(e.target.value)}>
                                            <option value="">Choose..</option>
                                            <option value="12V">12V</option>
                                            <option value="24V">24V</option>
                                            <option value="36V">36V</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="price" className="form-label">Warranty</label>
                                        <select id="price" className="form-select" onChange={e => setFltwarranty(e.target.value)}>
                                            <option value="">Choose..</option>
                                            <option value="1 Years">1 Years</option>
                                            <option value="2 Years">2 Years</option>
                                            <option value="3 Years">3 Years</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 text-center mt-3">
                                <button className="btn btn-dark me-3" onClick={showAll}>Show all</button>
                                <button className="btn btn-dark" onClick={filtertest}>Apply filter</button>
                            </div>

                        </div>
                    </div>

                    <div className="row g-4">



                        {productall.map((prod, index) => (
                            <div className="col-lg-3 col-sm-6" key={prod.id || index}>
                                <div className="card product-card">
                                    <img src={prod.imageUrl || "/sec-2.jpg"} className="product-img" alt="Battery" onClick={() => navigate(`/oneprod/${prod.model}`)} />
                                    <div className="card-body w-100">
                                        <h5 className="card-title"><b>Battery Model </b>{prod.model}</h5>
                                        <p className="mb-0 fs-6"><b>Capacity:</b> {prod.capacity}</p>
                                        <p className="mb-0 fs-6"><b>Voltage: </b>{prod.voltage}</p>
                                        <p className="mb-2 fs-6"><b>Warranty:</b> {prod.warranty}</p>
                                        <h5 className="text-dark">{prod.price}</h5>
                                        <button className="btn btn-dark w-100" onClick={() => addcart(prod.model)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>
                </div>


            </div>

        </div>
    )
}

export default Allprod
