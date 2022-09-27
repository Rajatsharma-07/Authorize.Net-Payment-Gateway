import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {VscCheck, VscChromeClose} from 'react-icons/vsc'
import axios from 'axios';

const SubscriptionPlan = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const currPlan = queryParams.get('currPlan');
    const planId = queryParams.get('planId');
    console.log('currPlan', currPlan);
    console.log('planId', planId);
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/get-all-subscriptions')
            .then((res) => {
                console.log('res', res);
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    console.log('data', data);
  return (
    <>
        <div><h3>Choose the plan that's right for you.</h3></div>
        <div style={{ display: 'inline-flex'}}>
            <div>

            <table style={{ border: '1px solid black', borderRadius: '20px', backgroundColor: 'white'}}>
                <tbody>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>Plan Name</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>Amount</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>Limit</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>Time Period</td>
                    </tr>
                    {data && data.map((plan) => {
                        if(planId != plan._id)
                        return(
                            <tr>
                                <td style={{ padding: '12px', border: '2px solid black', borderRadius: '10px', backgroundColor: 'red', color: 'white'}}>{plan.name}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid black'}}>{`$${plan.amount}`}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid black'}}>{plan.limit}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid black'}}>{`${plan.timePeriod} month`}</td>
                                <td style={{ padding: '12px', border: '1px solid black', borderRadius: '10px', backgroundColor: 'black'}}><Link to={`/recurring/${plan._id}/${id}?currPlan=${currPlan}&timePeriod=${plan.timePeriod}&occurrences=${plan.occurrences}`} style={{ 'textDecoration' : 'none', color: 'white'}}> Upgrade </Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default SubscriptionPlan;
