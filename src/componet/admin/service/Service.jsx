import React, { useEffect, useState } from 'react'
import './Servicestyle.css'

import { toast } from 'react-toastify';


import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, where, query } from "firebase/firestore";
import { app } from '../../../Firebase';

const db = getFirestore(app); // Initialize Firestore



const Service = () => {
  const [serviceall, setServiceall] = useState([]);


  //###################################################################### flt start

  const [fltname, setFltname] = useState("");
  const [fltcity, setFltcity] = useState("");

  const filtertest = async () => {
    console.log(fltname, fltcity);

    if (!fltname && !fltcity) {
      toast.warn("Please select at least one filter");
      return;
    }

    console.log("Fetching filtered products...");

    try {
      let filters = collection(db, "Services");

      let conditions = [];
      if (fltname) conditions.push(where("name", "==", fltname));
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




  //###################################################################### delet start
  const deletesrv = async (deletid) => {
    try {


      await deleteDoc(doc(db, "Services", deletid));

      console.log("Service delet successfully!");
      toast.success("Service delet successfully!");
      showAll()
    } catch (error) {
      console.error("Error delet Service:", error);
      toast.error("Error delet Service:", error);
    }
  }


  //###################################################################### delet end



  //###################################################################### edit start

  const [updtsrvid, setUpdtsrvid] = useState(null)
  const [updtname, setUpdtname] = useState(null)
  const [updtaddress, setUpdtaddress] = useState(null)
  const [updtcity, setUpdtcity] = useState(null)
  const [updtpincode, setUpdtpincode] = useState(null)
  const [updtlocation, setUpdtlocation] = useState(null)
  const [updtid, setUpdtid] = useState(null)


  const editsrv = async (id) => {
    console.log(id);
    const docRef = doc(db, "Services", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    if (docSnap.exists()) {

      setUpdtsrvid(data.id)
      setUpdtname(data.name)
      setUpdtaddress(data.address)
      setUpdtcity(data.city)
      setUpdtpincode(data.pincode)
      setUpdtlocation(data.location)
      setUpdtid(data.id)
    } else {
      console.log("No such document!");
    }
  };
  const updatesrv = async () => {
    try {

      const productRef = doc(db, "Services", updtid); // ✅ Properly create a document reference

      await setDoc(productRef, {
        id: updtsrvid, // ✅ No need for template literals
        name: updtname,
        address: updtaddress,
        city: updtcity,
        pincode: updtpincode,
        location: updtlocation
      });

      console.log("Service update successfully!");
      toast.success("Service Update successfully!");
      showAll()

    } catch (error) {
      console.error("Error updating Service:", error);
      toast.error("Error updating Service:", error);
    }
  };


  //###################################################################### edit end


  //###################################################################### one Service add start

  const [addsrvid, setAddsrvid] = useState(null)
  const [addsrvname, setAddsrvname] = useState(null)
  const [addsrvaddress, setAddsrvaddress] = useState(null)
  const [addsrvcity, setAddsrvcity] = useState(null)
  const [addsrvpincode, setAddsrvpincode] = useState(null)
  const [addsrvlocation, setAddsrvlocation] = useState(null)


  const addoneservice = async () => {
    try {
      console.log(addsrvid, addsrvname, addsrvaddress, addsrvcity, addsrvpincode, addsrvlocation);
      if (!addsrvid || !addsrvname || !addsrvaddress || !addsrvcity || !addsrvpincode || !addsrvlocation) {
        console.error("All fields are required!");
        toast.warn("All fields are required!");
        return;
      }

      const productRef = doc(db, "Services", addsrvid); // ✅ Properly create a document reference

      await setDoc(productRef, {
        id: addsrvid, // ✅ No need for template literals
        name: addsrvname,
        address: addsrvaddress,
        city: addsrvcity,
        pincode: addsrvpincode,
        location: addsrvlocation
      });

      console.log("Service added successfully!");
      toast.success("Service added successfully!");
      showAll()
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service:", error);
    }
  }
  //###################################################################### one Service add end






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


      <div className="container mt-4">
        <h2 className="mb-4">Service Center Management</h2>

        <button className="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#addServiceModal">
          <i className="fas fa-tools"></i> Add Service Center
        </button>

        <div className="row mb-3 d-flex justify-content-between">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Search Name..." defaultValue="" onChange={e => setFltname(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Find by city..." defaultValue="" onChange={e => setFltcity(e.target.value)}/>
          </div>
          <div className='col-md-3 d-flex justify-content-end'>
            <button className='btn btn-dark  me-1' onClick={showAll}>Refresh</button>
            <button className='btn btn-dark ' onClick={filtertest}>filter</button>
          </div>

        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abc Battery</td>
                <td>123 Street</td>
                <td>Ahmadabad</td>
                <td>361399</td>
                <td>361399,6656</td>
                <td className="action-icons">
                  <i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#editserviceModal"></i>
                  <i className="fas fa-trash delete"></i>
                </td>
              </tr>
              {serviceall.map((srv, index) => (
                <tr key={srv.id}>
                  <td>{srv.id}</td>
                  <td>{srv.name}</td>
                  <td>{srv.address}</td>
                  <td>{srv.city}</td>
                  <td>{srv.pincode}</td>
                  <td>{srv.location}</td>
                  <td className="action-icons">
                    <i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#editserviceModal" onClick={() => editsrv(srv.id)}></i>
                    <i className="fas fa-trash delete" onClick={() => deletesrv(srv.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="addServiceModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Add Service Center</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={e => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Id</label>
                  <input type="number" className="form-control" required onChange={(e) => setAddsrvid(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" required onChange={(e) => setAddsrvname(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" required onChange={(e) => setAddsrvaddress(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" required onChange={(e) => setAddsrvcity(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" required onChange={(e) => setAddsrvpincode(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" required onChange={(e) => setAddsrvlocation(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-dark w-100" onClick={addoneservice}>Add Service Center</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editserviceModal" tabIndex="-1" aria-labelledby="editUserModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Edit Service Center</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={e => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Id</label>
                  <input type="number" className="form-control" onChange={(e) => setUpdtsrvid(e.target.value)} value={updtsrvid} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" onChange={(e) => setUpdtname(e.target.value)} value={updtname} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" onChange={(e) => setUpdtaddress(e.target.value)} value={updtaddress} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" onChange={(e) => setUpdtcity(e.target.value)} value={updtcity} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" onChange={(e) => setUpdtpincode(e.target.value)} value={updtpincode} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" onChange={(e) => setUpdtlocation(e.target.value)} value={updtlocation} required />
                </div>
                <button type="submit" className="btn btn-dark w-100 " onClick={updatesrv}>Update Service Center</button>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Service
