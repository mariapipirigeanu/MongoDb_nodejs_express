import Rect, { useCallback } from 'react';
//import './App.css';
import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
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

const current=new Date();
const datecurrent=`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
// const Example = () => {
//     const [startDate, setStartDate] = useState(new Date());
//     return (
//       <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//     );
//   };
 const [startDate, setStartDate] = useState(new Date());
const[date, setDate]=useState("");

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[phone,setPhone]=useState("");

const[sender,setSender]=useState("");
const[receiver,setReceiver]=useState("");
const[message_content,setMessage_content]=useState("");


const[errors,setErrors]=useState({name:"",email:"",phone:"",sender:"", receiver:"",message_content:""});


   function validate(values){
   
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
        err.receiver = 'Sender is required';
      }

      else if (receiver.length <3) {
        err.receiver = 'Receiver cannot be less than 3 characters ';
      }
      if (!message_content) {
        err.message_content = 'Sender is required';
      }
return err;
    
  };

const handleSubmit = e => {
    e.preventDefault();

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
 setErrors(validate(obj));


 console.log(Object.keys(errors).length);
 if (Object.keys(errors).length === 0){
     
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
 //else alert("Errors in the form!")
}
return(
<div className="App">
    <h1> Complete the form </h1>
   {/* <form onSubmit={e => e.preventDefault()}>*/}
        <form onSubmit={handleSubmit}  validate>
       
        <div className="date">
        <p>
        <label> Date: </label> 
        <DatePicker selected={startDate} 
        onChange={date => setStartDate(date)}
         onInput={e => setDate(e.target.date)}
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
         required 
         placeholder="name"
         value={name}
         onInput={e => setName(e.target.value)}
      /> 
      {errors.name && <p className="errors"> {errors.name} </p>}
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
     {errors.email && <p className="errors"> {errors.email} </p>}
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
        {errors.phone && <p className="errors"> {errors.phone} </p>}
        </p>
        </div>

        <div className="messages">
        <h3>Messages</h3>
        <p>
            <label> Message Date: </label>
            <DatePicker selected={startDate} 
             onChange={date => setStartDate(date)}
            onInput={e => setDate(e.target.date)}
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
         {errors.sender && <p className="errors"> {errors.sender} </p>}
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
        {errors.receiver && <p className="errors"> {errors.receiver} </p>}
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
         {errors.message_content && <p className="errors"> {errors.message_content} </p>}
        </p>
        
        </div>
    <button className="btn" type="submit" onClick={()=> onSubmit()}> Submit </button>

    </form>
</div>
);
            
  
  }


export default HomePage;