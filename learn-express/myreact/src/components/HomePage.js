import Rect from 'react';
//import './App.css';
import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import axios from 'axios';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

// const schema = yup.object().shape({
//     users: yup.array().of(
//         yup.object().shape({
//             username: yup.string().required('Required'),
//             useremail: yup.string().email("Invalid email").required('Required'),
//             userphone: yup.string().required('Required')
//         })
//     ).min(1),
//     messages: yup.array().of(
//         yup.object().shape({
//             messages_sender: yup.string().min(0).required('Required'),
//             messages_receiver: yup.string().min(0).required('Required'),
//             messages_content: yup.string().min(0).required('Required')
//         })
//     ).min(1)
// })



function HomePage() {

const current=new Date();
const datecurrent=`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


const[date, setDate]=useState("");

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[phone,setPhone]=useState("");

const[sender,setSender]=useState("");
const[receiver,setReceiver]=useState("");
const[message_content,setMessage_content]=useState("");



  const validate = () => {
   
    let err = {};
    if (!name) {
      err.name = 'Name is required';
    }
    if (name.length < 3) {
      err.name = 'Name cannot be less than 3 characters';
    }
    if (!email) {
      err.email = 'Mail is required';
    }
    if (!phone) {
        err.phone = 'Phone is required';
      }
      if (!sender) {
        err.sender = 'Sender is required';
      }
      if (sender.length <3) {
        err.sender = 'Sender cannot be less than 3 characters ';
      }

      if (!receiver) {
        err.receiver = 'Sender is required';
      }

      if (receiver.length <3) {
        err.receriver = 'Receiver cannot be less than 3 characters ';
      }
      if (!message_content) {
        err.message_content = 'Sender is required';
      }

    return err;
  };

//   const handleChange = e => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

// const{register,handleSubmit,errors} =useForm({
//    // resolver: yupResolver(schema),
// }
// );

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
    date: date,
    users: users,
    messages:messages
}
console.log(obj);
axios.post("http://localhost:5000/messages/add",date)
.then(res => {
    console.log(res);
    console.log(res.data);
})
}


 

// const showError = (errorObj) => {
//     let errMsg = '';
//     for (let err in errorObj) {
//       errMsg += `${errorObj[err]}. `
//     }
//     alert(`Errors ${errMsg}`);
//   }



 
return(
<div className="App">
    <h1> Complete the form </h1>
    <form onSubmit={e => e.preventDefault()}>
        <div className="date">
            <p>
            <label> Date: </label>
        <input 
        name="date"
         type="date"
         value={date}
         onInput={e => setDate(e.target.value)}
     
         />
          {datecurrent}
        </p>
        </div>

        <div className="users">
        <h3>Users:</h3>
            <p>
            <label> Name: </label>
        <input 
        name="name"
         type="text" 
         required 
         placeholder="name"
         value={name}
         onInput={e => setName(e.target.value)}
      /> 
     
        </p>

        <p>
            <label> Email: </label>
        <input 
        name="email"
         type="email" 
         required 
         placeholder="user@email.com"
         value={email}
         onInput={e => setEmail(e.target.value)}
        />
     
        </p>

        <p>
            <label> Phone: </label>
        <input 
        name="phone"
         type="text" 
         required 
         placeholder="phone number"
         value={phone}
         onInput={e => setPhone(e.target.value)}
        />
      
        </p>
        </div>

        <div className="messages">
        <h3>Messages</h3>
        <p>
            <label> Message Date: </label>
        <input 
        name="date"
         type="date" 
         value={date}
         onInput={e => setDate(e.target.value)}
        />
         
        </p>

        <p>
            <label> Sender: </label>
        <input 
        name="sender"
         type="text" 
         required 
         placeholder="name"
         value={sender}
         onInput={e => setSender(e.target.value)}  
        />
         
        </p>

        <p>
            <label> Receiver: </label>
        <input 
        name="receiver"
         type="text" 
         required 
         placeholder="name receiver"
         value={receiver}
         onInput={e => setReceiver(e.target.value)}
         />

        </p>

        <p>
            <label> Content: </label>
        <input 
        name="message_content"
        required 
        placeholder="message"
         type="text" 
         value={message_content}
         onInput={e => setMessage_content(e.target.value)}
        />
         
        </p>
        
        </div>
    <button className="btn" type="submit" onClick={()=> onSubmit()}> Submit </button>

    </form>
</div>
);
            
  
  }


export default HomePage;