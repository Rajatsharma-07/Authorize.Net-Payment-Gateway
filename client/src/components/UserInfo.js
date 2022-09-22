import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
/* import { useLocation } from 'react-router-dom'; */

const UserInfo = () => {
    /* const location = useLocation(); */
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    console.log('id_Rajat', id);

    /* console.log('location.state.info', location.state.info);
    // const id = location.state.info; */

       useEffect(() => {
        axios.get(`/user-info?id=${id}`).then((res) => {
            console.log('res-->', res)
            setUserData(res);
        }).catch((err) => {
            console.error(err); 
        })
      }, [id]); 

      /* return <div>Hii</div>; */
    
  return (
    
   <div>

      <h2>Cart Table</h2>
        <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'marginLeft':'250px'}}>
        <tbody>
          <tr>
            <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>Index</td>
            <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>Cart Id</td>
            <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>User Id</td>
            <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>Plan Id</td>
            <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>Amount</td>
          </tr>
          {userData && Object.keys(userData.data.cart).map((key, index) => {
            return(
              <>
              <tr>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>{key}</td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {userData.data.cart[index]._id}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {userData.data.cart[index].user}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {userData.data.cart[index].planId}
                </td>
                <td style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                  {userData.data.cart[index].totalAmount}
                </td>
              </tr>
              </>
            
            )
          })}
        </tbody>
      </table>
      <hr />
      <h2>User Information</h2>
      <table style={{ 'marginLeft': '450px'}}>
        <tbody>
        {userData && Object.keys(userData.data.user).map((key, index) => {
            return(
              <>
              <tr>
                <td >User Id : </td>
                <td >
                  {userData.data.user[0]._id}
                </td>
                </tr>
                <tr>
                <td >User Name : </td>  
                <td >
                  {userData.data.user[0].name}
                </td>
                </tr>
                <tr>
                  <td >User Email : </td>
                <td >
                  {userData.data.user[0].email}
                </td>
              </tr>
              </>
            
            )
          })}
        </tbody>
      </table>

      <button style={{backgroundColor: 'red'}}><Link to={`/user-subscription/${id}`} style={{textDecoration : 'none', color: 'white'}}>View Subscription</Link></button>

    </div> 
  )
}

export default UserInfo
