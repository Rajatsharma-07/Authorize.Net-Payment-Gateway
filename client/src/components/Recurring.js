import React from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormComponent, AcceptHosted } from 'react-authorize-net';
import { Flex, Box, Text, Heading } from "rebass";
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'

/* const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
} */

const App = () => {

  const queryParams = new URLSearchParams(window.location.search);
    const currPlan = queryParams.get('currPlan');
    const timeLimit = queryParams.get('timePeriod');
    const occurrences = queryParams.get('occurrences');
    console.log('currPlan', currPlan);
    console.log('timeLimit', timeLimit);

  const [amount, setAmount] = useState(null);
  const [timePeriod, setTimePeriod] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { id, user } = useParams();
  console.log('id', id);
  console.log('user', user);

  useEffect(() => {
    axios.get(`/recurring/data?id=${id}&user=${user}`)
      .then((res) => { 
        console.log('res', res)
        setAmount(res.data[0].amount);
        setTimePeriod(res.data[0].timePeriod);
      }).
      catch((err) => { 
        console.error(err)
      });
  }, [id]);
    let clientKey = 'bizdev05';
    let apiLoginId = '4kJd237rZu59qAZd';
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const navigate = useNavigate();
    const {cardNumber, expiryDate, cvv} = formData;
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value });
    };
    const handleSubmit = (event) => {
        console.log('formData-->', formData);
        setDisabled(true);
        axios.post(`/recurring?card_number=${formData.cardNumber}&expiry_date=${formData.expiryDate}&cvv=${formData.cvv}&amount=${amount}&timeperiod=${timePeriod}&id=${id}&user=${user}&currPlan=${currPlan}&timeLimit=${timeLimit}&occurrences=${occurrences}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });

        setTimeout(function(){navigate(`/user-info/${user}`)}, 5000);
    }

    return(
  <Styles>
    <Form
      onSubmit={handleSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active
      }) => {
        return (
            <>
            <h1>Recurring Subscription Payment Model</h1>
          <form onSubmit={handleSubmit}>
            <Card
              number={cardNumber || ''}
              expiry={expiryDate || ''}
              name={values.name || ''}
              cvc={cvv || ''}
              focused={active}
            />
            <div>
              <Field
                name="cardNumber"
                value={cardNumber}
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                onChange={(event) => handleChange(event)}   
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                name="expiryDate"
                value={expiryDate}
                type="text"
                maxLength="4"
                onChange={(event) => handleChange(event)}
                placeholder="Valid Thru"
                
              />
              <input
                name="cvv"
                value={cvv}
                type="text"
                maxLength="3"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={disabled}>
                {`Pay $${amount}`}
              </button>
              {/* <button
                type="button"
                onClick={handleClick}
              >
                Pay Per Use
              </button> */}
            </div>
          </form>
          </>
        )
      }}
    />
  </Styles>
)
}

export default App;
