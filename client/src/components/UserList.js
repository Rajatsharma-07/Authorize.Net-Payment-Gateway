import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
/* import { useNavigate } from 'react-router-dom'; */
import axios from 'axios';

const UserList = () => {
    const [response, setResponse] = useState([]);
    /* const navigate = useNavigate(); */
    
    useEffect(() => {
      axios
        .get('/user')
        .then((res) => {
                if(res){
                    console.log(res.data);
                    setResponse(res.data);
                    
                }
            })
        .catch((err) => console.error(err));
    
    }, []);
    // useEffect(() => {
    //   console.log("updated values of response", response);
    
    // },[response]);

    console.log('response-->>', response);

    /* const handleClick = (event) => {
      console.log(event);
      // navigate('/user-info', { state: { id: 1, info: event } });
    } */
    
  return (
    <>
    <div style={{display : 'inline-flex'}}>
    <h1>User List</h1>
    </div>
    <div>
      {/* <div>{JSON.stringify(response)}</div> */}
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', display: 'inline-flex'}}>
        <tbody>
          {Object.keys(response).map((key, index) => {
            return(
              <tr>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>{key}</td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {response[index]._id}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {response[index].name}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {response[index].email}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}><button><Link to={`/user-info/${response[index]._id}`} style={{ 'textDecoration' : 'none' }} >View Info</Link></button></td>
              </tr>
            
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default UserList;
