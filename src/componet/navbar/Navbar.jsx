import React, { useEffect, useState } from 'react'
import './Navstyle.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import db, { app } from '../../Firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
const auth = getAuth(app)






const Navbar = () => {


    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [useremail, setUseremail] = useState(null);
    const [itm, setItm] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //setUser(currentUser);
            if (currentUser) {
                setUsername(currentUser.displayName);
                setUseremail(currentUser.email);
            } else {
                setUsername("please signin.")
            }
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const signout = async () => {
        await signOut(auth).then(() => {
            toast.success("you SignOut..")
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        });
    }


    // ####################################################################### cart item st

    useEffect(() => {
        
        const getitm = async () => {
            if (!useremail) return;  // ✅ Prevent running if useremail is null
            try {
                const docRef = doc(db, "user", useremail);
                const querySnapshot = await getDoc(docRef);

                if (querySnapshot.exists()) {
                    setItm(querySnapshot.data());  // ✅ Set data only if document exists
                } else {
                    setItm({});  // ✅ Set empty object if no data found
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getitm();
    }, [useremail])
    // ####################################################################### cart item end
    return (
        <div>

            <div className="nav container-fluid z-3 p-0">
                <div className="container-fluid  m-2 rounded nav1  d-flex align-items-center ">
                    <div className="navcomp navbar mx-1 d-flex justify-content-between container-fluid">
                        <div>
                            <div className="pt-1 text-center text-white">
                                <div>
                                    <p className="m-0 lg-head lgc">DELTA</p>
                                    <p className="m-0 lg-cont lgc">Battery Services</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-white d-flex align-items-center justify-content-center">
                            <div className="menu d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </div>

                            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1"
                                id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                <div className="offcanvas-header">
                                    <div>
                                        <div className="pt-1 text-center text-dark">
                                            <div>
                                                <p className="m-0 lg-head lgc">DELTA</p>
                                                <p className="m-0 lg-cont lgc">Battery Services</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbarul">
                                        <li className="my-2" onClick={() => navigate("/")}>Home</li>
                                        <li className="my-2">Product
                                            <ul className="navbarul">
                                                <li className="my-2" onClick={() => navigate("/allproduct")}>All Product</li>
                                                <li className="my-2" onClick={() => navigate("/findby")}>Find by details</li>
                                            </ul>
                                        </li>
                                        <li className="my-2">Service
                                            <ul className="navbarul">
                                                <li className="my-2" onClick={() => navigate("/service")}>Book Service</li>
                                                <li className="my-2" onClick={() => navigate("/dealer")}>Find Dealer</li>
                                                <li className="my-2" onClick={() => navigate("/warranty")}>Warranty Ragister</li>
                                            </ul>
                                        </li>
                                        <li className="my-2" onClick={() => navigate("/blog")}>Blog</li>
                                        <li className="my-2" onClick={() => navigate("/contactus")}>contact Us</li>
                                    </ul>
                                </div>
                            </div>




                            <div className="navitm d-none d-lg-block">
                                <div className="navitm2 ">
                                    <ul className="mb-0 ps-0 ">
                                        <li className="btn rounded-pill px-3 mx-1 py-1 navbarli" onClick={() => navigate("/")}><a className="nav-link p-0  text-white">Home</a></li>
                                        <li className="btn rounded-pill px-3 mx-1 py-1 navbarli dropdown">

                                            <a className="nav-link p-0 text-white mx-0 pb-3">Products<i className="ms-2 fa-solid fa-caret-down"></i></a>
                                            <ul className="dropdown-list border">
                                                <li onClick={() => navigate("/allproduct")}>All Product</li>
                                                <li onClick={() => navigate("/findby")}>Find by Detail</li>

                                            </ul>
                                        </li>

                                        <li className="btn rounded-pill px-3 mx-1 py-1 navbarli dropdown">

                                            <a className="nav-link p-0 text-white mx-0 pb-3">Services<i className="ms-2 fa-solid fa-caret-down"></i></a>
                                            <ul className="dropdown-list border">
                                                <li onClick={() => navigate("/service")}>Book Service</li>
                                                <li onClick={() => navigate("/dealer")}>Find Dealer</li>
                                                <li onClick={() => navigate("/warranty")}>Warranty Ragister</li>

                                            </ul>

                                        </li>
                                        <li className="btn rounded-pill px-3 mx-1 py-1 navbarli dropdown" onClick={() => navigate("/blog")}>

                                            <a className="nav-link p-0 text-white mx-0 pb-3">Blogs</a>

                                        </li>

                                        <li className="btn rounded-pill px-3 mx-1 py-1 navbarli" onClick={() => navigate("/contactus")}><a className="nav-link p-0  text-white">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="crt-prof d-flex align-items-center justify-content-center">
                                <div className="cart ms-2 position-relative" onClick={() => navigate("/cart")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                    </svg>
                                    <div className='bg-warning rounded-pill cartbadge'>{Object.keys(itm).length-1}</div>
                                </div>
                                <div className="profile-pic ms-2  dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle"
                                        viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fillRule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                </div>
                                <div className="dropdown-menu profile-dropdown dropdown-menu-end">
                                    <div className="profile-header">
                                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                                        <div>
                                            <strong>{username}</strong><br />
                                            <span className="text-muted">{useremail}</span>
                                        </div>
                                    </div>
                                    <ul className="profile-menu">
                                        <li>
                                            <i className="fa-solid fa-circle-user"></i> View Profile
                                        </li>
                                        <li onClick={signout}>
                                            <i className="fa-solid fa-right-from-bracket"></i> Logout
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
