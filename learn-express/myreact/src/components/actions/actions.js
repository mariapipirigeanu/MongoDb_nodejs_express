import axios from 'axios';

export const getMessages = () =>(dispatch)=> {
    axios.get('http://localhost:5000/messages/')
            .then(res => {
               
               // console.log(res.data);
                dispatch ({type:"GET_MESSAGES",payload:res.data})
            })
            .catch(function (error) {
                console.log(error);
            });
   
}