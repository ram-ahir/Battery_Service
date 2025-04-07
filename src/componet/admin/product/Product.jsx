import React, { useEffect, useState } from 'react'
import './Productstyle.css'
import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc } from "firebase/firestore";
import { app } from '../../../Firebase';

const db = getFirestore(app); // Initialize Firestore

const Product = () => {
    const [productall, setProductall] = useState([]);


    //###################################################################### delet start
    const deleteprod = async (deletid) => {
        try {


            await deleteDoc(doc(db, "batterytest", deletid));

            console.log("Product delet successfully!");
            toast.success("Product delet successfully!");
        } catch (error) {
            console.error("Error delet product:", error);
            toast.error("Error delet product:", error);
        }
    }


    //###################################################################### delet end


    //###################################################################### edit start

    const [updtmodel, setUpdtmodel] = useState(null)
    const [updtimg, setUpdtimg] = useState(null)
    const [updtimgurl, setUpdtimgurl] = useState(null)
    const [updtcapacity, setUpdtcapacity] = useState(null)
    const [updtvoltage, setUpdtvoltage] = useState(null)
    const [updtwarranty, setUpdtwarranty] = useState(null)
    const [updtprice, setUpdtprice] = useState(null)
    const [updtid, setUpdtid] = useState(null)

    // Handle image file selection
    const updthandleFileChange = (e) => {
        if (e.target.files[0]) {
            setUpdtimg(e.target.files[0]);
        }
    };
    // Upload image to API and return the URL
    const updtuploadImage = async () => {
        if (!updtimg) return null;

        const formData = new FormData();
        formData.append("file", updtimg);
        formData.append("upload_preset", "battery"); // Replace with actual preset
        formData.append("cloud_name", "dcbykcqbe"); // Your cloud name

        try {
            const response = await fetch(
                // "http://clickandcall.spectricssolutions.com/apilist/flutter_image.php",
                "https://api.cloudinary.com/v1_1/dcbykcqbe/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const result = await response.json();
            console.log("Image Upload Response:", result);

            if (result.url) {
                console.log(result.url)
                return result.url; // Return the uploaded image URL
            } else {
                throw new Error("No image URL returned from API");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed");
            return null;
        }
    };



    const editprod = async (id) => {

        console.log(id);
        const docRef = doc(db, "battery", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        if (docSnap.exists()) {
            setUpdtimgurl(data.imageUrl)
            setUpdtmodel(data.model)
            setUpdtcapacity(data.capacity)
            setUpdtvoltage(data.voltage)
            setUpdtwarranty(data.warranty)
            setUpdtprice(data.price)
            setUpdtid(data.model)
        } else {
            console.log("No such document!");
        }
    };
    const updateprod = async () => {

        try {
            let newImageUrl = updtimgurl; // Keep the existing image if not changed

            if (updtimg) {
                const uploadedUrl = await updtuploadImage();
                if (uploadedUrl) {
                    newImageUrl = uploadedUrl;
                }
            }


            const productRef = doc(db, "battery", updtid); // ✅ Properly create a document reference

            await setDoc(productRef, {
                imageUrl: newImageUrl,
                model: updtmodel, // ✅ No need for template literals
                capacity: updtcapacity,
                voltage: updtvoltage,
                warranty: updtwarranty,
                price: updtprice
            });

            console.log("Product update successfully!");
            toast.success("Product Update successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product:", error);
        }
    };


    //###################################################################### edit end







    //###################################################################### show all prod start

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
            toast.error("Error fetching products:", error);
        }
        console.log(productall)
    };
    useEffect(() => {
        showAll();
    }, []);

    //###################################################################### show all prod end





    //###################################################################### one product add start

    const [addmodel, setAddmodel] = useState(null)
    const [addcapacity, setAddcapacity] = useState(null)
    const [addvoltage, setAddvoltage] = useState(null)
    const [addwarranty, setAddwarranty] = useState(null)
    const [addprice, setAddprice] = useState(null)
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    // #############  handleFileChange st
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };
    // #############  handleFileChange end

    // #############  uploadimg st
    const uploadImage = async () => {
        if (!image) {
            alert("Please select an image");
            return null;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "battery"); // Replace with actual preset
        formData.append("cloud_name", "dcbykcqbe"); // Your cloud name

        try {
            console.log("Uploading image..."); // Debug log
            const response = await fetch(
                // "http://clickandcall.spectricssolutions.com/apilist/flutter_image.php",
                "https://api.cloudinary.com/v1_1/dcbykcqbe/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const result = await response.json();
            console.log("Upload success:", result); // Debug log

            if (result.url) {
                setImageUrl(result.url);
                console.log(result.url);
                return result.url; // Make sure API returns imageUrl
            } else {
                throw new Error("No image URL returned from API");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed");
            return null;
        }
    };

    // #############  uploadimg end



    const addoneproduct = async () => {
        try {
            const uploadedImageUrl = await uploadImage(); // Upload image first
            if (!uploadedImageUrl) return; // Stop if upload fails

            console.log(addmodel, addcapacity, addvoltage, addwarranty, addprice);

            if (!addmodel || !addcapacity || !addvoltage || !addwarranty || !addprice) {
                console.error("All fields are required!");
                toast.warn("All fields are required!");
                return;
            }

            const productRef = doc(db, "batterytest", addmodel); // ✅ Properly create a document reference

            await setDoc(productRef, {
                imageUrl: uploadedImageUrl, // Store image URL in Firestore
                model: addmodel, // ✅ No need for template literals
                capacity: addcapacity,
                voltage: addvoltage,
                warranty: addwarranty,
                price: addprice
            });

            console.log("Product added successfully!");
            toast.success("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Error adding product:", error);
        }
    }
    //###################################################################### one product add end


    //###################################################################### all models st
    // List of battery specifications
    const capacities = [40, 50, 60]; // Ah
    const voltages = [12, 24, 36]; // V
    const warranties = [1, 2, 3]; // Years

    // Function to generate models and upload to Firestore
    const uploadBatteryModels = async () => {
        try {
            for (let capacity of capacities) {
                for (let voltage of voltages) {
                    for (let warranty of warranties) {
                        // Generate model name (e.g., 40121 for 40Ah, 12V, 1 Year)
                        const modelName = `${capacity}${voltage}${warranty}`;

                        // Generate price based on specifications
                        const price = 5000 + (capacity * 50) + (voltage * 100) + (warranty * 1000);

                        // Firestore document data
                        const batteryData = {
                            imageUrl: `http://clickandcall.spectricssolutions.com/apilist/uploads/${modelName}.webp`,
                            model: `${modelName}`,
                            capacity: `${capacity}Ah`,
                            voltage: `${voltage}V`,
                            warranty: `${warranty} Years`,
                            price: `₹${price}`,
                        };

                        // Upload to Firestore with model name as document ID
                        await setDoc(doc(db, "battery", modelName), batteryData);
                        console.log(`Uploaded Model: ${modelName}`);
                    }
                }
            }
            alert("All battery models have been uploaded successfully!");
        } catch (error) {
            console.error("Error uploading models:", error);
        }
    };
    //###################################################################### all models end

    return (
        <div>
            <h2>Add Products</h2>

            <div className="row g-2 mt-1 border border-dark-subtle rounded p-3">
                <h6 className="pb-0 m-0">Heading</h6>
                <div className="input-group input-group-sm">
                    <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Model</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" onChange={(e) => setAddmodel(e.target.value)} />
                </div>

                <h6 className="pb-0 mb-0">Images</h6>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">Hero Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">2. Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" />
                </div>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">3. Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" />
                </div>
                <h6 className="pb-0 mb-0">Product Details</h6>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Capacity:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddcapacity(e.target.value)}>
                        <option >Choose...</option>
                        <option value="40Ah">40Ah</option>
                        <option value="50Ah">50Ah</option>
                        <option value="60Ah">60Ah</option>
                    </select>
                </div>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Voltage:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddvoltage(e.target.value)}>
                        <option >Choose...</option>
                        <option value="12V">12V</option>
                        <option value="24V">24V</option>
                        <option value="36V">36V</option>
                    </select>
                </div>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Warranty:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddwarranty(e.target.value)}>
                        <option >Choose...</option>
                        <option value="1 Years">1 Years</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                    </select>
                </div>
                <div className="input-group input-group-sm">
                    <span className="input-group-text">₹</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => setAddprice(`₹${e.target.value}`)} />
                </div>

                <div className="btn btn-dark" onClick={addoneproduct}>Add Product</div>


            </div>

            {/* <div>
                <h1>Product List</h1>
                <button onClick={showAll}>Refresh Products</button>
                <ul>
                    {productall.map((prod, index) => (
                        <li key={prod.id || index}>
                            <strong>Model:</strong> {prod.model},
                            <strong> Capacity:</strong> {prod.capacity},
                            <strong> Price:</strong> {prod.price}
                        </li>
                    ))}
                </ul>
            </div> */}


            <div className="d-flex justify-content-between row my-5">
                <h4 className=" col-5" >All Product</h4>
                {/* <button className="btn btn-dark col-1" onClick={showAll}>Refresh</button> */}
                <button className="btn btn-dark col-1" onClick={uploadImage}>Refresh</button>
            </div>


            <div className="row g-4">

                {productall.map((prod, index) => (
                    <div className="col-lg-3 col-sm-6" key={prod.id || index}>
                        <div className="card product-card">
                            <img src={prod.imageUrl || "/sec-2.jpg"} className="product-img" alt="Battery" />
                            <div className="card-body  w-100">
                                <h5 className="card-title"><b>Battery Model </b>{prod.model}</h5>
                                <p className="mb-0 fs-6"><b>Capacity:</b> {prod.capacity}</p>
                                <p className="mb-0 fs-6"><b>Voltage: </b>{prod.voltage}</p>
                                <p className="mb-2 fs-6"><b>Warranty:</b> {prod.warranty}</p>
                                <h5 className="text-dark">{prod.price}</h5>
                                <div className="d-flex justify-content-between row mx-1">
                                    <button className="btn btn-dark col-5" data-bs-toggle="modal" data-bs-target="#editproductModal" onClick={() => editprod(prod.id)}>Edit</button>
                                    <button className="btn btn-dark col-5" onClick={() => deleteprod(prod.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="row g-2 mt-1 border border-dark-subtle rounded p-3 container m-auto" style={{backgroundColor:"#f8f9fa"}}>
                <div className="modal-header">
                    <h5 className="modal-title" id="editUserModalLabel">Update Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <h6 className="pb-0 m-0">Heading</h6>
                <div className="input-group input-group-sm">
                    <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Model</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"  onChange={(e) => setAddmodel(e.target.value)} />
                </div>

                <h6 className="pb-0 mb-0">Images</h6>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">Hero Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" />
                </div>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">2. Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" />
                </div>
                <div className="input-group input-group-sm">
                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">3. Img</label>
                    <input type="file" className="form-control" id="inputGroupFile01" />
                </div>
                <h6 className="pb-0 mb-0">Product Details</h6>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Capacity:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddcapacity(e.target.value)}>
                        <option >Choose...</option>
                        <option value="40Ah">40Ah</option>
                        <option value="50Ah">50Ah</option>
                        <option value="60Ah">60Ah</option>
                    </select>
                </div>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Voltage:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddvoltage(e.target.value)}>
                        <option >Choose...</option>
                        <option value="12V">12V</option>
                        <option value="24V">24V</option>
                        <option value="36V">36V</option>
                    </select>
                </div>
                <div className="input-group input-group-sm ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Warranty:</label>
                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setAddwarranty(e.target.value)}>
                        <option >Choose...</option>
                        <option value="1 Years">1 Years</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                    </select>
                </div>
                <div className="input-group input-group-sm">
                    <span className="input-group-text">₹</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => setAddprice(`₹${e.target.value}`)} />
                </div>

                <div className="btn btn-dark">Update Product</div>


            </div> */}
            <div className="modal fade" id="editproductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">update product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-2 mt-1 border border-dark-subtle rounded p-3 container m-auto" style={{ backgroundColor: "#f8f9fa" }}>

                                <h6 className="pb-0 m-0">Heading</h6>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Model</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm" value={updtmodel} onChange={(e) => setUpdtmodel(e.target.value)} />
                                </div>

                                <h6 className="pb-0 mb-0">Images</h6>
                                <div className="input-group input-group-sm">
                                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">Hero Img</label>
                                    <input type="file" accept="image/*" onChange={updthandleFileChange} className="form-control" id="inputGroupFile01" />
                                </div>
                                <div className="input-group input-group-sm">
                                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">2. Img</label>
                                    <input type="file" className="form-control" id="inputGroupFile01" />
                                </div>
                                <div className="input-group input-group-sm">
                                    <label className="input-group-text fw-semibold" htmlFor="inputGroupFile01">3. Img</label>
                                    <input type="file" className="form-control" id="inputGroupFile01" />
                                </div>
                                <h6 className="pb-0 mb-0">Product Details</h6>
                                <div className="input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Capacity:</label>
                                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setUpdtcapacity(e.target.value)}>
                                        <option value={updtcapacity}>{updtcapacity}</option>
                                        <option value="40Ah">40Ah</option>
                                        <option value="50Ah">50Ah</option>
                                        <option value="60Ah">60Ah</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Voltage:</label>
                                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setUpdtvoltage(e.target.value)}>
                                        <option value={updtvoltage}>{updtvoltage}</option>
                                        <option value="12V">12V</option>
                                        <option value="24V">24V</option>
                                        <option value="36V">36V</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Warranty:</label>
                                    <select className="form-select" id="inputGroupSelect01" onChange={(e) => setUpdtwarranty(e.target.value)}>
                                        <option value={updtwarranty}>{updtwarranty}</option>
                                        <option value="1 Years">1 Years</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">₹</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-sm" value={updtprice} onChange={(e) => setUpdtprice(e.target.value)} />
                                </div>

                                <div className="btn btn-dark" onClick={updateprod}>Update Product</div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product
