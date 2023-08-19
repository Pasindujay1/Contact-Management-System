import React,{  useContext, useEffect, useState } from "react";
import {Modal} from 'react-bootstrap'; //popup model for edit/delete
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";


const AllContact = () =>{
    const {toast} = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); //For the spinner
    const [modalData, setModalData] = useState({});
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async()=>{
        setLoading(true);
        try{
            const res = await fetch(`http://localhost:8000/api/mycontacts`,{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const result = await res.json();
            if(!result.error){
                setContacts(result.contacts);
                setLoading(false);
            }else{
                console.log(result);
                setLoading(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchContacts();
    },[])
    // We get the error "Uncaught TypeError: destroy is not a function" Error in React because
   //If we return anything from a useEffect function it must be a function.
   //For additional details refer code below and - https://stackoverflow.com/questions/74265321/uncaught-typeerror-destroy-is-not-a-function-error-in-react
    
    const deleteContact = async(id) =>{
        //confirm deletion
        if(window.confirm("Are you sure you want to delete this contact ?")){
            try{
                const res = await fetch(`http://localhost:8000/api/delete/${id}`,{
                    method:"DELETE",
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if(!result.error){
                    setContacts(result.myContacts);
                    toast.success("Deleted Contact");
                    setShowModal(false);
                }else{
                    toast.error(result.error)
                }
            }catch(err){
                console.log(err);
            }
        }

    }
    
    return <>
        <div>
            <h1>Your Contacts</h1> 
            <hr className="my-4"/>
            {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length == 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <>
                
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}

       </div>
       
 
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h3>{modalData.name}</h3>
          <p><strong>Address : </strong>{modalData.address}</p>
          <p><strong>Email : </strong>{modalData.email}</p>
          <p><strong>Phone Number : </strong>{modalData.phone}</p>
        </Modal.Body>

        <Modal.Footer>
            <Link className="btn btn-info" to={`/edit/${modalData._id}`}>EDIT</Link>
          <button className="btn btn-danger" onClick={()=> deleteContact(modalData._id) }>DELETE</button>
          <button className="btn btn-warning" onClick={()=> setShowModal(false)}>CLOSE</button>

        </Modal.Footer>
      </Modal>
    


    </>
};


export default AllContact;





// import React,{  useEffect, useState } from "react";
// import Spinner from "../components/Spinner";


// const AllContact = () =>{
//     const [loading, setLoading] = useState(false); //For the spinner
//     const [contacts, setContacts] = useState([]);

//     useEffect(async()=>{
//         setLoading(true);
//         try{
//             const res = await fetch(`http://localhost:8000/api/mycontacts`,{
//                 method:"GET",
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             const result = await res.json();
//             if(!result.error){
//                 setContacts(result.contacts);
//                 setLoading(false);
//             }else{
//                 console.log(result);
//                 setLoading(false);
//             }
//         }catch(err){
//             console.log(err);
//         }
//     },[])
   
//     return <>
//         <div>
//             <h1>Your Contacts</h1> 
//             <hr className="my-4"/>
//             {loading ? <Spinner splash="Loading Contacts..."/>:(<table className="table table-hover">
//                 <thead>
//                     <tr className="table-dark">
//                     <th scope="col">NAME</th>
//                     <th scope="col">ADDRESS</th>
//                     <th scope="col">EMAIL</th>
//                     <th scope="col">PHONE NUMBER</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {contacts.map((contact)=>(
//                         <tr key={contact._id}>
//                             <th scope="row">{contact.name}</th>
//                             <td>{contact.address}</td>
//                             <td>{contact.email}</td>
//                             <td>{contact.phone}</td>
//                         </tr>
//                     ))}
                
//                 </tbody>
//             </table>)}
            

//        </div>
//     </>
// };


// export default AllContact;