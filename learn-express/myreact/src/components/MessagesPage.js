import Rect,{useEffect,useState} from 'react';
//import './App.css';
import axios from 'axios';

function MessagesPage() {

    const[messages,setMessages] = useState([]);
    const [reload, setReload] = useState(false);

    function getMessages() {
   
        axios.get('http://localhost:5000/messages/')
            .then(res => {
                setMessages(res.data);
               // console.log(res.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
      }
      function deleteMessages(itemId){
        axios.delete(`http://localhost:5000/messages/delete/${itemId}` )
        .then(response => {
            setReload(!reload);
            console.log(response);
            alert("Message Deleted...");
    });
}
      useEffect(() => {
        getMessages();
    }, [reload]);
    
   

    const loadMessages = () => {
       
        if (messages.length > 0) {
         
          console.log(messages.length);
          return messages.map((message) => (
             // console.log(message)
            message.messages.map(m =>
            <div className="msj" key={m._id}>
              <p>Id Message: {m._id} </p>
              <p>Sender: {m.sender}</p>
              <p>Receiver: {m.receiver}</p>
              <p>Message content: {m.message_content}</p>
              <p>Date: {m.date}</p>
              <button className="btn1" onClick={() => deleteMessages(message._id)}>Delete</button>
            </div>
            )
          ));
    }
    };

  return (
    <div className="App">
        <h1>Messages </h1>
        {loadMessages()}
     
    </div>
    
  

  );
}


export default MessagesPage;

