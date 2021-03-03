import Rect,{useEffect,useState} from 'react';
//import './App.css';
import axios from 'axios';

function MessagesPage() {

    const[messages,setMessages] = useState([]);


    function getMessages() {

        axios.get('http://localhost:5000/messages/')
            .then(res => {
                setMessages({ messages: res.data });
                console.log(res.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteMessages(itemId){
        axios.delete("http://localhost:5000/messages/delete/:id", { params: { id: itemId } })
        .then(response => {
            console.log(response);
    });
}

    useEffect(() => {
        getMessages();
    }, []);
    
    console.log(messages);
    // const obj=messages.map((message)=> {
    //     return (message.message_content);
    // });
    // console.log(obj);
  return (
    <div >
        <h1>Messages </h1>
        {/* {messages.map(message => (
            <div>
                <p>Sender: {message.sender}</p>
                <p>Receiver: {message.receiver}</p>
                <p>Message content: {message.message_content}</p>
                <p>Date:{message.date}</p>
            </div>
        ))} */}
     
    </div>
    
  

  );
}

export default MessagesPage;

