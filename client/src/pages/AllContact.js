import React,{  useEffect, useState } from "react";
import Spinner from "../components/Spinner";


const AllContact = () =>{
    const [loading, setLoading] = useState(false); //For the spinner
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
    return <>
        <div>
            <h1>Your Contacts</h1> 
            <hr className="my-4"/>
            {loading ? <Spinner splash="Loading Contacts..."/>:(<table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                    <th scope="col">NAME</th>
                    <th scope="col">ADDRESS</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact)=>(
                        <tr key={contact._id}>
                            <th scope="row">{contact.name}</th>
                            <td>{contact.address}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                        </tr>
                    ))}
                
                </tbody>
            </table>)}
            

       </div>
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