import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserSubscription from './UserSubscription';
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
      <h2>User Information</h2>
      <table style={{ display: 'inline-flex'}}>
        <tbody>
        {userData && Object.keys(userData.data).map((key, index) => {
            return(
              <>
              <tr>
                <td >User Id : </td>
                <td >
                  {userData.data[0]._id}
                </td>
                </tr>
                <tr>
                <td >User Name : </td>  
                <td >
                  {userData.data[0].name}
                </td>
                </tr>
                <tr>
                  <td >User Email : </td>
                <td >
                  {userData.data[0].email}
                </td>
              </tr>
              </>
            
            )
          })}
        </tbody>
      </table>
      <UserSubscription />
    </div> 
  )
}

export default UserInfo
