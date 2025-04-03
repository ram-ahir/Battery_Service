import React, { useEffect, useState } from 'react';
import './Findbystyle.css';
import { getFirestore, collection, getDocs, where, query, getDoc, doc } from "firebase/firestore";
import { app } from '../../Firebase';

const db = getFirestore(app); // Initialize Firestore

const Findby = () => {
    const [dropmake, setDropmake] = useState("");
    const [dropmodel, setDropmodel] = useState([]);
    const [dropyear, setDropyear] = useState([]);
    const [dropengine, setDropengine] = useState([]);
    const [allMakes, setAllMakes] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedengine, setSelectedengine] = useState("");
    const [batterys, setBatterys] = useState("");
    const [finalbattery, setFinalbattery] = useState({});
    const [display, setDisplay] = useState("d-none");


    // Fetch all car makes on component mount
    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "car"));
                let makesArray = [];
                querySnapshot.forEach((doc) => {
                    const make = doc.data().make;
                    if (!makesArray.includes(make)) {
                        makesArray.push(make);
                    }
                });
                setAllMakes(makesArray);
            } catch (error) {
                console.error("Error fetching makes:", error);
            }
        };

        fetchMakes();
    }, []);

    // Fetch models based on selected make
    useEffect(() => {
        if (!dropmake) {
            setDropmodel([]);
            setDropyear([]);
            setDropengine([]);
            return;
        }

        const fetchModels = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "car"), where("make", "==", dropmake)));
                let modelsArray = [];
                querySnapshot.forEach((doc) => {
                    const model = doc.data().model;
                    if (!modelsArray.includes(model)) {
                        modelsArray.push(model);
                    }
                });
                setDropmodel(modelsArray);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, [dropmake]); // Runs whenever dropmake changes

    // Fetch years based on selected model
    useEffect(() => {
        if (!selectedModel) {
            setDropyear([]);
            setDropengine([]);
            return;
        }

        const fetchYears = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "car"), where("model", "==", selectedModel), where("make", "==", dropmake)));
                let yearsArray = [];
                querySnapshot.forEach((doc) => {
                    const year = doc.data().year;
                    if (!yearsArray.includes(year)) {
                        yearsArray.push(year);
                    }
                });
                setDropyear(yearsArray);
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        };

        fetchYears();
    }, [selectedModel]); // Runs whenever selectedModel changes

    // Fetch engine types based on selected year
    useEffect(() => {
        if (!selectedYear) {
            setDropengine([]);
            return;
        }

        const fetchEngines = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "car"), where("year", "==", selectedYear), where("model", "==", selectedModel)));
                let enginesArray = [];
                querySnapshot.forEach((doc) => {
                    const engine = doc.data().type; // Assuming "engine" is stored in Firestore
                    if (!enginesArray.includes(engine)) {
                        enginesArray.push(engine);
                    }
                });
                setDropengine(enginesArray);
            } catch (error) {
                console.error("Error fetching engines:", error);
            }
        };

        fetchEngines();
    }, [selectedYear]); // Runs whenever selectedYear changes

    const findbattery = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "car"), where("year", "==", selectedYear), where("model", "==", selectedModel), where("type", "==", selectedengine), where("make", "==", dropmake)));
            let batteryarr = "";
            querySnapshot.forEach((doc) => {
                const bat = doc.data().battery_model
                batteryarr = bat
            });
            setBatterys(batteryarr.toString());
            console.log(batteryarr);
            const docRef = doc(db, "battery", batterys);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setFinalbattery(docSnap.data());
                setDisplay("d-block")
            } else {
                // docSnap.data() will be undefined in this case
                setDisplay("d-none")
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching engines:", error);
        }
    };
  
    return (
        <div>
            <div className="main-sec py-5">
                <div className="container py-5">
                    <h2 className="text-center mb-4">Find the Right Battery for Your Vehicle</h2>

                    <div className="card p-4 shadow">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="row g-3">
                                {/* Select Make Dropdown */}
                                <div className="col-md-3">
                                    <label className="form-label">Select Make</label>
                                    <select className="form-select" value={dropmake} onChange={e => setDropmake(e.target.value)}>
                                        <option value="">Choose...</option>
                                        {allMakes.map((make, index) => (
                                            <option key={index} value={make}>{make}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Select Model Dropdown (Dependent on Make Selection) */}
                                <div className="col-md-3">
                                    <label className="form-label">Select Model</label>
                                    <select className="form-select" value={selectedModel} onChange={e => setSelectedModel(e.target.value)} disabled={!dropmake}>
                                        <option value="">Choose...</option>
                                        {dropmodel.map((model, index) => (
                                            <option key={index} value={model}>{model}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Select Year Dropdown (Dependent on Model Selection) */}
                                <div className="col-md-3">
                                    <label className="form-label">Select Year</label>
                                    <select className="form-select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)} disabled={!selectedModel}>
                                        <option value="">Choose...</option>
                                        {dropyear.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Select Engine Type Dropdown (Dependent on Year Selection) */}
                                <div className="col-md-3">
                                    <label className="form-label">Engine Type</label>
                                    <select className="form-select" value={selectedengine} onChange={e => setSelectedengine(e.target.value)} disabled={!selectedYear}>
                                        <option value="">Choose...</option>
                                        {dropengine.map((engine, index) => (
                                            <option key={index} value={engine}>{engine}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button className="btn btn-dark px-4" onClick={findbattery}>Find Battery</button>
                            </div>
                        </form>
                    </div>
                    {
                        <div className={`mainsec container ${display}`}>
                        <div className="row mt-5" id="batteryResults">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-sm-12">
                                        <div className="card product-card p-2 shadow mx-3">
                                            <img src={finalbattery.imageUrl||"/sec-2.jpg"} className="product-img mb-2 mb-lg-0" alt="Product" />
                                            <div className="secimg me-2">
                                                <div className="sec-img d-flex flex-row flex-lg-column px-lg-2">
                                                    <img src="./sec-2.jpg" className="product-img2 mb-lg-1 me-2" alt="Product" />
                                                    <img src="./sec-2.jpg" className="product-img2 mt-lg-1" alt="Product" />

                                                </div>
                                            </div>
                                            <div className="card-body ">
                                                <h5 className="card-title fw-bolder">Battery Model {finalbattery.model}</h5>
                                                <p className="mb-0 fs-6"><b>Capacity:</b> {finalbattery.capacity}</p>
                                                <p className="mb-0 fs-6"><b>Voltage: </b>{finalbattery.voltage}</p>
                                                <p className="mb-2 fs-6"><b>Warranty:</b> {finalbattery.warranty}</p>
                                                <p className="mb-2 fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis dolor repellendus natus quae! Ullam, quia mollitia? Ducimus corporis corrupti incidunt commodi, nobis explicabo minus sunt quasi, asperiores eum, ad adipisci.</p>
                                                <h5 className="text-success fw-bold">{finalbattery.price}</h5>
                                                <button className="btn btn-dark mt-4">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {/* <div className="mainsec pt-5 container">
                        <div className="row mt-5" id="batteryResults">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-sm-12">
                                        <div className="card product-card p-2 shadow mx-3">
                                            <img src="./sec-2.jpg" className="product-img mb-2 mb-lg-0" alt="Product" />
                                            <div className="secimg me-2">
                                                <div className="sec-img d-flex flex-row flex-lg-column px-lg-2">
                                                    <img src="./sec-2.jpg" className="product-img2 mb-lg-1 me-2" alt="Product" />
                                                    <img src="./sec-2.jpg" className="product-img2 mt-lg-1" alt="Product" />

                                                </div>
                                            </div>
                                            <div className="card-body ">
                                                <h5 className="card-title fw-bolder">Battery Model X123</h5>
                                                <p className="mb-0 fs-6"><b>Capacity:</b> 70 Ah</p>
                                                <p className="mb-0 fs-6"><b>Voltage: </b>12V</p>
                                                <p className="mb-2 fs-6"><b>Warranty:</b> 2 Years</p>
                                                <p className="mb-2 fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis dolor repellendus natus quae! Ullam, quia mollitia? Ducimus corporis corrupti incidunt commodi, nobis explicabo minus sunt quasi, asperiores eum, ad adipisci.</p>
                                                <h5 className="text-success fw-bold">$199.99</h5>
                                                <button className="btn btn-dark mt-4">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Findby;
