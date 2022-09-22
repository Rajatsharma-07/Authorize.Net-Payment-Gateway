import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {VscCheck, VscChromeClose} from 'react-icons/vsc'

const SubscriptionPlan = () => {
    const { id } = useParams();
  return (
    <>

        <div><h3>Choose the plan that's right for you.</h3></div>
        <div style={{ display: 'inline-flex'}}>
            <div>

            <table style={{ border: '1px solid black', borderRadius: '20px', backgroundColor: 'white'}}>
                <tbody>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}></td>
                        <td style={{ padding: '12px', border: '2px solid black', borderRadius: '10px', backgroundColor: 'red', color: 'white'}}><h3>Standard</h3></td>
                        <td style={{ padding: '12px', border: '2px solid black', borderRadius: '10px', backgroundColor: 'red', color: 'white'}}><h3>Standard Plus</h3></td>
                        <td style={{ padding: '12px', border: '2px solid black', borderRadius: '10px', backgroundColor: 'red', color: 'white'}}><h3>Extended</h3></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><h4>Price</h4></td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>$250</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>$2000</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>$4000</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><h4>Limit Per Month</h4></td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>10</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>100</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}>Unlimited</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><h4>Cancel At Anytime</h4></td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><VscCheck /></td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><VscChromeClose /></td>
                        <td style={{ padding: '12px', borderBottom: '1px solid black'}}><VscChromeClose /></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px'}}></td>
                        <td style={{ padding: '12px', border: '1px solid black', borderRadius: '10px', backgroundColor: 'black'}}><Link to={`/recurring/6321ad6445d1b99518bcfef8/${id}`} style={{ 'textDecoration' : 'none', color: 'white'}}> Upgrade </Link></td>
                        <td style={{ padding: '12px', border: '1px solid black', borderRadius: '10px', backgroundColor: 'black'}}><Link to={`/recurring/6321ade645d1b99518bcfef9/${id}`} style={{ 'textDecoration' : 'none', color: 'white'}}> Upgrade </Link></td>
                        <td style={{ padding: '12px', border: '1px solid black', borderRadius: '10px', backgroundColor: 'black'}}><Link to={`/recurring/6321ae4e45d1b99518bcfefa/${id}`} style={{ 'textDecoration' : 'none', color: 'white'}}> Upgrade </Link></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default SubscriptionPlan;
