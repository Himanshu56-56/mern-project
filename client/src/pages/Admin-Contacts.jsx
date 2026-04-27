import { useEffect } from "react";
import {useAuth} from "../store/auth"; 
import {toast} from "react-toastify";
import { useState } from "react";

 export const AdminContacts = () =>{
    const [contactData,setContactData] = useState([]); 
    const {authorizationToken} = useAuth();
    const getContactData = async () =>{
        try{
            const response = await fetch("https://mern-project-onz2.onrender.com",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            const data = await response.json();
            console.log("contact data:",data);
            if(response.ok){
                setContactData(data);
            }
        }catch(error){
            console.log(error);
            
        }
    };

    // defining the function delete contactbyid
    const deleteContactById = async (_id) =>{
        try{
          const response = await fetch(`https://mern-project-onz2.onrender.com/api/admin/contacts/delete/${_id}`,{
            method:"DELETE",
            headers:{
                Authorization:authorizationToken,
            },
          }
        );
        if (response.ok){
            getContactData();
            toast.success("Deleted Successfully");
        }else{
            toast.error("Not Deleted")
        }
        }catch(error){
            console.log(error);
            
        }
    };

    useEffect(()=>{
        getContactData();
    },[]);
    return (
        <>
          <section className="admin-contact-section">
            <h1>Admin Contact Data</h1>
            <div className="container Admin-users">
                {contactData.map((curContactData, index) =>{
                    const {username,email,message,_id} = curContactData;
                    return(
                        <div key={index}>
                            <p>{username}</p>
                            <p>{email}</p>
                            <p>{message}</p>
                            <button className="btn" onClick={()=>deleteContactById(_id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
          </section>
        </>
    );
};