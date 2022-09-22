import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

const UserSubscription = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('id', id);
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get(`/user-subs?id=${id}`)
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleClick = (event) => {
        console.log(event);
        axios.delete(`/delete-subs?id=${event}`)
            .then((res) => {
                console.log('deleted', res);
            })
            .catch((err) => {
                console.error(err);
            });

            window.location.reload();
    }

  return (
    <>
    <div><h3>Subsciption Plans</h3></div>
    <div style={{ display: 'inline-flex'}}>
        <table style={{border : '1px solid black'}}>
            <tbody>
                <tr>
                    <td style={{border : '1px solid black'}}>Subscription Id</td>
                    <td style={{border : '1px solid black'}}>Start Date</td>
                    <td style={{border : '1px solid black'}}>Limit</td>
                    <td style={{border : '1px solid black'}}>Limit Used</td>
                </tr>
                {data && Object.keys(data).map((key, index) => {
                    return(
                        <tr>
                            <td style={{border : '1px solid black'}}>{data[index].subscriptionId}</td>
                            <td style={{border : '1px solid black'}}>{data[index].startDate}</td>
                            <td style={{border : '1px solid black'}}>{data[index].limit}</td>
                            <td style={{border : '1px solid black'}}>{data[index].limitUsed}</td>
                            <td style={{border : '1px solid black', backgroundColor: 'red'}}><button style={{ border: 'none', backgroundColor: 'red', color: 'white'}} onClick={(event) => handleClick(data[index].subscriptionId)}>Cancel</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    <div><h3> Want to change plan?</h3></div>
    <div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}`} style={{textDecoration : 'none', color: 'white'}}>Change Plan</Link></button></div>
    </>
  )
}

export default UserSubscription
