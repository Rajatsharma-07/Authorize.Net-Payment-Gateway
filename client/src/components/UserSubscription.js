import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const UserSubscription = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('id', id);
    const [data, setData] = useState('');
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [availableLimit, setAvailableLimit] = useState(0);
    const [limit, setLimit] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [patientAdded, setPatientAdded] = useState(false);


    useEffect(() => {
        axios.get(`/user-subs?id=${id}`)
            .then((res) => {

                var startOnlyDate = res.data[0].startDate.split('T')[0];

                setStartDate(startOnlyDate);

                var availLimit = res.data[0].limit;
                setAvailableLimit(availLimit);
                var limitUsed = res.data[0].limitUsed;
                setLimit(limitUsed);

                // var subId = res.data[0].subscriptionId
                // var sdate = res.data[0].startDate.split('-')[1];
                // var smonth = res.data[0].startDate.split('-')[2].match(/.{1,2}/g)[0];

                var endOnlyDate = res.data[0].endDate.split('T')[0];

                setEndDate(endOnlyDate);

                // var edate = res.data[0].endDate.split('-')[1];
                // var emonth = res.data[0].endDate.split('-')[2].match(/.{1,2}/g)[0];

                console.log('res', res);
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleClick = (event) => {
        console.log(event);
        alert('are you sure?');
        axios.put(`/delete-subs?id=${event}`)
            .then((res) => {
                console.log('updated', res);
            })
            .catch((err) => {
                console.error(err);
            });

            window.location.reload();
    }

    const handlePatients= () => {
        setLimit(limit + 1);
        setPatientAdded(true);
        console.log('disable', disabled);
        console.log('limit---->', limit);
        console.log('limitdfg---->', limit);
    }
    useEffect(()=> {
        if(limit == 10){
            setDisabled(true);
        }
        console.log("Need to update limit to ", limit);
        if(data.length > 0)
        axios.put(`/add-patient?id=${data[0].subscriptionId}&limit=${limit}`).then((res)=>{console.log(res)}).catch((err)=>{console.error(err)});
        // axios.put(`/add-patient?id=${data[0].subscriptionId}&limit=${limit}`).then((res)=>{console.log(res)}).catch((err)=>{console.error(err)});
    }, [limit, patientAdded,data ]);

  return (
    <>
    <div><h3>Active Subsciption</h3></div>
    <div style={{ display: 'inline-flex'}}>
        <table style={{border : '1px solid black'}}>
            <tbody>
                <tr>
                    <td style={{border : '1px solid black'}}>Subscription Id</td>
                    <td style={{border : '1px solid black'}}>Start Date</td>
                    <td style={{border : '1px solid black'}}>End Date</td>
                    <td style={{border : '1px solid black'}}>Limit</td>
                    <td style={{border : '1px solid black'}}>Limit Used</td>
                    <td style={{border : '1px solid black', backgroundColor: 'green'}}><button type='submit' disabled={disabled} style={{border : 'none', backgroundColor: 'green', color: 'white'}} onClick={() => {
    const confirmBox = window.confirm(
      "Add One Patient?"
    )
    console.log(confirmBox);
    if (confirmBox === true) {
      handlePatients();
    }
  }}>Add</button></td>
                </tr>
                {data && Object.keys(data).map((key, index) => {
                    return(
                        <tr>
                            <td style={{border : '1px solid black'}}>{data[index].subscriptionId}</td>
                            <td style={{border : '1px solid black'}}>{data[index].startDate.split('T')[0]}</td>
                            <td style={{border : '1px solid black'}}>{data[index].endDate.split('T')[0]}</td>
                            <td style={{border : '1px solid black'}}>{data[index].limit}</td>
                            <td style={{border : '1px solid black'}}>{limit}</td>
                            <td style={{border : '1px solid black', backgroundColor: 'red'}}><button style={{ border: 'none', backgroundColor: 'red', color: 'white'}} onClick={(event) => handleClick(data[index].subscriptionId)}>Cancel</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    {(!data) ? <><div><h4> Choose the plan that's right for you. </h4></div>
    <div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}`} style={{textDecoration : 'none', color: 'white'}}>Choose Plan</Link></button></div></> :  ( data && limit >= availableLimit) ? <><div><h4> Your monthly limit is exhausted. Update to upgrade your limit</h4></div>
    <div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}?currPlan=${data[0].subscriptionId}&planId=${data[0].planId}`} style={{textDecoration : 'none', color: 'white'}}>Update Plan</Link></button></div><div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}`} style={{textDecoration : 'none', color: 'white'}}>Add Patients Now</Link></button></div></> : (startDate >= endDate) ?  <><div><h4> Your subscription is expired</h4></div>
    <div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}`} style={{textDecoration : 'none', color: 'white'}}>Update Plan</Link></button></div></> : <><div><h4>Want to change plan?</h4></div>
    <div><button style={{border: 'none', backgroundColor : 'red',  height: '25px'}}><Link to={`/subscription-plans/${id}?currPlan=${data[0].subscriptionId}&planId=${data[0].planId}`} style={{textDecoration : 'none', color: 'white'}}>Choose Plan</Link></button></div></>}
    
    </>
  )
}

export default UserSubscription
