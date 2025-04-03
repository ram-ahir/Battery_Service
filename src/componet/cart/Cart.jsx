import React, { useEffect, useRef, useState } from 'react'
import './Cartstyle.css'
import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, query, where, deleteField, updateDoc } from "firebase/firestore";
import { app } from '../../Firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { QRCodeCanvas } from "qrcode.react";

const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);

const Cart = () => {
    const [itm, setItm] = useState({});
    const [finitm, setFintm] = useState([]);
    const [email, setEmail] = useState('no email');
    const [uname, setUname] = useState('no name');
    const [totalp, setTotalp] = useState(null);

    //######################################################################################### UPI ST


    const [upiID, setUpiID] = useState("deltabattery@hdfcbank");
    const [upiLink, setUpiLink] = useState("");
    const [qr, setQr] = useState(null);

    // const upiLink = `upi://pay?pa=${upiID}&pn=Your Name&am=${amount}&cu=INR`;

    const checkout = async () => {
        console.log(totalp);
        setUpiLink(`upi://pay?pa=${upiID}&pn=Ram Ahir&am=${totalp}&cu=INR`)
        setQr(<QRCodeCanvas value={upiLink} size={200} />)
        console.log(upiLink);
    };
    useEffect(() => {
        checkout();
    }, [totalp])


    //######################################################################################### UPI end



    const confirmorder = async () => {
        function generate5DigitID() {
            return Math.floor(10000 + Math.random() * 90000).toString();
        }
        function getFormattedDate() {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Date().toLocaleDateString('en-US', options);
        }

        let id = generate5DigitID()
        let date = getFormattedDate()

        await setDoc(doc(db, "order", id), {
            id: id,
            name: uname,
            total: totalPrice,
            date: date
        });

        console.log(Date)
    }

    //######################################################################################### delete cart st
    const deleteFieldFromDocument = async (id) => {
        try {
            const docRef = doc(db, "user", email); // Replace with your collection & doc ID

            await updateDoc(docRef, {
                [id]: deleteField() // Replace 'fieldName' with the actual field name
            });

            console.log("Field deleted successfully!");
            const getitm = async () => {
                try {
                    const docRef = doc(db, "user", email);
                    const querySnapshot = await getDoc(docRef);
                    setItm(querySnapshot.data())
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            getitm();
        } catch (error) {
            console.error("Error deleting field:", error);
        }
    };
    //######################################################################################### delete cart end


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email); // Set user email
                setUname(user.displayName)
            } else {
                setEmail(null); // No user logged in
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);


    useEffect(() => {
        const getitm = async () => {
            try {
                const docRef = doc(db, "user", email);
                const querySnapshot = await getDoc(docRef);
                setItm(querySnapshot.data() || { xx: "xx" })
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getitm();
    }, [email])


    useEffect(() => {

        const getfineitm = async () => {
            try {
                const keys = Object.keys(itm);
                let productsArray = [];

                // Use Promise.all() to wait for all Firebase requests to complete
                const promises = keys.map(async (key) => {
                    console.log(key);
                    const docRef = doc(db, "battery", key);
                    const querySnapshot = await getDoc(docRef);
                    return querySnapshot.exists() ? querySnapshot.data() : null;
                });

                // Wait for all promises to resolve
                const results = await Promise.all(promises);

                // Filter out any null values (in case some documents don't exist)
                productsArray = results.filter((item) => item !== null);

                setFintm(productsArray); // ✅ Now setting finitm correctly
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (Object.keys(itm).length > 0) {
            getfineitm();
        }
    }, [itm])

    const showfin = () => {
        console.log(itm);

    }

    const setquant = async (val, id) => {
        console.log(val, id)
        await setDoc(doc(db, "user", email), {
            [id]: Number(val)

        }, { merge: true });
        const getitm = async () => {
            try {
                const docRef = doc(db, "user", email);
                const querySnapshot = await getDoc(docRef);
                setItm(querySnapshot.data())
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getitm();
    };

    const totalPrice = finitm.reduce((acc, item) => {
        const price = Number(item.price.replace(/[^0-9]/g, "")); // Extract numeric price
        const quantity = itm[item.model] || 1; // Default quantity is 1 if undefined
        return acc + (price * quantity);
    }, 0);

    useEffect(() => {
        const totalPrice = finitm.reduce((acc, item) => {
            const price = Number(item.price.replace(/[^0-9]/g, "")); // Extract numeric price
            const quantity = itm[item.model] || 1; // Default quantity is 1 if undefined
            return acc + (price * quantity);
        }, 0);
        setTotalp(totalPrice.toString())
    }, [finitm])





    return (
        <div>
            <div className="container-fluid  pt-5 px-4 py-5">
                <h2 className="fw-bold  pt-5">My Cart</h2>

                <div className="cart-container m-0 row gap-4 align-items-start justify-content-between ">
                    <div className="col-lg-8">

                        {finitm.map((it) => (
                            <div key={it.model}
                                className="cart-item col-md-12 col d-flex justify-content-between flex-column flex-sm-row border-top border-dark-subtle border-2">
                                <div className="d-flex gap-4">
                                    <img src={it.imageUrl || "/sec-2.jpg"} alt="Product Image" className="cart-img" />
                                    <div className="cart-info">
                                        <h5 className="card-title fw-bolder">Battery Model {it.model}</h5>
                                        <p className="mb-0 text-muted fs-6"><b>Capacity:</b> {it.capacity}</p>
                                        <p className="mb-0 text-muted fs-6"><b>Voltage: </b>{it.voltage}</p>
                                        <p className="mb-0 text-muted fs-6"><b>Warranty:</b> {it.warranty}</p>

                                    </div>
                                </div>

                                <div className="d-flex gap-3 gap-md-5">
                                    <div className="">
                                        <p className="fw-bold mb-1">Each</p>
                                        <p className="fw-bold text-muted">{it.price}</p>

                                    </div>
                                    <div className="">
                                        <p className="fw-bold mb-1">Quantity</p>
                                        <select className="form-select form-select-sm w-auto d-inline" defaultValue={itm[it.model]} onChange={(e) => setquant(e.target.value, it.model)}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <p className="fw-bold mb-1">Total</p>
                                        <p className="fw-bold  text-muted m-0">₹{Number(it.price.replace(/[^0-9]/g, "")) * itm[it.model]}</p>
                                        <div style={{ height: "30px", width: "30px" }} className='mt-3' onClick={() => deleteFieldFromDocument(it.model)}>
                                            <i className="fa-solid fa-trash-can ms-2"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        <div
                            className="cart-item col-md-12 col d-flex justify-content-between flex-column flex-sm-row border-top border-black border-2">

                            <div className="d-flex justify-content-between container-fluid px-5 fw-bolder fs-6">
                                <div className="">
                                    Total Item: {finitm.length}
                                </div>

                                <div className="">
                                    ₹{totalPrice}
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="row my-auto col-lg-4 col">

                        <div className="col-md-12">
                            <p className="mb-0">Enter Promo Code</p>
                            <div className="promo-code d-flex justify-content-between mb-3">
                                <input type="text" className="form-control rounded-0" placeholder="Promo Code" />
                                <button className="btn btn-dark  rounded-0">Submit</button>
                            </div>
                            <div className="summary-box">
                                <div className="price-info">
                                    <p><span>Shipping cost:</span> <span>TBD</span></p>
                                    <p><span>Discount:</span> <span>-$0</span></p>
                                    <p><span>Tax:</span> <span>TBD</span></p>
                                    <hr className="m-1 border border-dark border-1" />
                                    <p className="fw-bold mb-0"><span>Estimated Total:</span> <span>₹{totalPrice}</span></p>
                                </div>
                            </div>

                            <div className="pay mt-3">

                                <button type="button" className="btn btn-dark container-fluid rounded-pill py-2 mb-2" data-bs-toggle="modal" data-bs-target="#checkoutModal" onClick={() => checkout()}><i
                                    className="fa-solid fa-lock me-2"></i>Checkout</button>
                                <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog ">
                                        <div className="modal-content position-relative">
                                            {/* <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Proceed to checkout</h1>

                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div> */}
                                            <div className="modal-body">
                                                <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close" ></button>

                                                <div className="col-md-12">
                                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                                        {/* <h3>Scan to Pay via UPI</h3> */}
                                                        <h5 class="mb-4 text-center">Scan and pay with any UPI app</h5>
                                                        <img src="https://www.labnol.org/_astro/upi.j-WpZxjV.svg" alt="UPI" style={{height:"40px"}} className='mb-4' />
                                                        {qr}
                                                        <p className='mt-3 mb-0'>UPI ID: {upiID}</p>
                                                    </div>
                                                    <div className="summary-box">
                                                        <div className="price-info">
                                                            <p><span>Total item:</span> <span> {finitm.length}</span></p>
                                                            <p><span>Discount:</span> <span>-$0</span></p>
                                                            <p><span>Tax:</span> <span>TBD</span></p>
                                                            <hr className="m-1 border border-dark border-1" />
                                                            <p className="fw-bold mb-0"><span>Estimated Total:</span> <span>₹{totalPrice}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="pay mt-3">

                                                        <button type="button" className="btn btn-dark container-fluid rounded-pill py-2 mb-2" onClick={confirmorder} >Confirm Order</button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
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

export default Cart
