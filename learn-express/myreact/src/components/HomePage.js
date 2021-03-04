
//import './App.css';
import React, {useState,useEffect} from 'react';

import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import {yupResolver} from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//     users: yup.array().of(
//         yup.object().shape({
//             name: yup.string().required('Required'),
//             email: yup.string().email("Invalid email").required('Required'),
//             phone: yup.string().required('Required')
//         })
//     ).min(1),
//     messages: yup.array().of(
//         yup.object().shape({
//             sender: yup.string().min(0).required('Required'),
//             receiver: yup.string().min(0).required('Required'),
//             message_content: yup.string().min(0).required('Required')
//         })
//     ).min(1)
// })



function HomePage() {

const [startDate, setStartDate] = useState(new Date());
const[date, setDate]=useState(new Date());

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[phone,setPhone]=useState("");

const[sender,setSender]=useState("");
const[receiver,setReceiver]=useState("");
const[message_content,setMessage_content]=useState("");


const[errors,setErrors]=useState({});
const[isSubmitting,setIsSubmitting]=useState(false);

   function validate(){
   
    let err = {};
    if (!name) {
      err.name = 'Name is required';
    }
   else if (name.length < 3) {
      err.name = 'Name cannot be less than 3 characters';
    }
    if (!email) {
      err.email = 'Mail is required';
    } else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        err.email="Email address is invalid"
    }
    
    if (!phone) {
        err.phone = 'Phone is required';
      }
     if (!sender) {
        err.sender = 'Sender is required';
      }
     else if (sender.length <3) {
        err.sender = 'Sender cannot be less than 3 characters ';
      }

      if (!receiver) {
        err.receiver = 'Receiver is required';
      }

      else if (receiver.length <3) {
        err.receiver = 'Receiver cannot be less than 3 characters ';
      }
      if (!message_content) {
        err.message_content = 'Content is required';
      }
return err;
    
  };

const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
};

const onSubmit = () => {
 
const users=[{
    name:name,
    email: email,
    phone: phone
}]
const messages=[{
    
    date:date,
    sender:sender,
    receiver:receiver,
    message_content:message_content
}]
const obj={ 
    users: users,
    messages:messages,
    date: date
    
}

console.log(obj);
// setErrors(validate());
// setIsSubmitting(true);

console.log(errors);
console.log(Object.keys(errors).length);
if (Object.keys(errors).length === 0 && isSubmitting){
     
axios.post("http://localhost:5000/messages/add",obj)
.then(res => {
    alert("Message Added...");
    console.log(res);
    console.log(res.data);
})
.catch((error) =>{
    console.log(error);
});
 }
  else  alert("Errors in the form!")
 
 }

useEffect(()=> {
    if (Object.keys(errors).length === 0 && isSubmitting){
         console.log("Submitted");
         
        
    }
},[errors])

return(
<div className="App">
    <h1> Complete the form </h1>
   
        <form onSubmit={handleSubmit}  noValidate>
       
        <div className="date">
        <p>
        <label> Date: </label> 
        <DatePicker  selected={startDate} 
        onChange={date => setStartDate(date)}
        dateFormat='dd/MM/yyyy'
         />
         </p>
        </div>

        <div className="users">
        <h3>Users:</h3>
            <p>
            <label> Name: </label>
        <input 
        name="name"
         type="text" 
         placeholder="name"
         value={name}
        onChange={e => setName(e.target.value)}
      /> 
      {errors.name && <p className="errors"> {errors.name} </p>}
        </p>
       
        <p>
            <label> Email: </label>
        <input 
        name="email"
         type="email" 
         placeholder="user@email.com"
         value={email}
        onChange={e => setEmail(e.target.value)}
        />
     {errors.email && <p className="errors"> {errors.email} </p>}
        </p>

        <p>
            <label> Phone: </label>
        <input 
        name="phone"
         type="text" 
         placeholder="phone number"
         value={phone}
        onChange={e => setPhone(e.target.value)}
        />
        {errors.phone && <p className="errors"> {errors.phone} </p>}
        </p>
        </div>

        <div className="messages">
        <h3>Messages</h3>
        <p>
            <label> Message Date: </label>
            <DatePicker selected={startDate} 
             onChange={date => setStartDate(date)}
             />
        </p>

        <p>
            <label> Sender: </label>
        <input 
        name="sender"
         type="text" 
         placeholder="name"
         value={sender}
        onChange={e => setSender(e.target.value)}
        />
         {errors.sender && <p className="errors"> {errors.sender} </p>}
        </p>

        <p>
            <label> Receiver: </label>
        <input 
        name="receiver"
         type="text" 
         placeholder="name receiver"
         value={receiver}
        onChange={e => setReceiver(e.target.value)}
         />
        {errors.receiver && <p className="errors"> {errors.receiver} </p>}
        </p>

        <p>
            <label> Content: </label>
        <input 
        name="message_content"
        placeholder="message"
         type="text" 
         value={message_content}
        onChange={e => setMessage_content(e.target.value)}
        />
         {errors.message_content && <p className="errors"> {errors.message_content} </p>}
        </p>
        
        </div>
    <button className="btn" type="submit" onClick={()=> onSubmit()}> Submit </button>

    </form>
</div>
);
            
  
  }


export default HomePage;