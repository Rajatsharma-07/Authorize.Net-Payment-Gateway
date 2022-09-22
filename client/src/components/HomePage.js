import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    /* const navigate = useNavigate();
    const handlePay = () =>  {
        navigate('/payment');
    };

    const handleUser = () =>  {
        navigate('/user');
    };

    const handleRecurring = () =>  {
        navigate('/recurring');
    } */

  return (
    <div>
        <button><Link to={`/user`} style={{ 'textDecoration' : 'none' }}>User List</Link></button>
        <br/>
        <button><Link to={`/payment`} style={{ 'textDecoration' : 'none' }}>Pay Per Use</Link></button>
        <br/>
        <button><Link to={`/subscription-plans`} style={{ 'textDecoration' : 'none' }}>Subscription plans</Link></button>
      
    </div>
  )
}

export default HomePage
