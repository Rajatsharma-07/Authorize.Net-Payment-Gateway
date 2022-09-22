import React, { useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    useEffect(() => {
      console.log("Payment form mounted");
    }, []);
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
        axios.post(`/payment?card_number=${formData.cardNumber}&expiry_date=${formData.expiryDate}&cvv=${formData.cvv}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleClick = (event) => {
        navigate('/recurring');
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
            <h1>Pay Per Use Payment Model</h1>
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
              <button type="submit" disabled={submitting}>
                Purchase
              </button>
              <button
                type="button"
                onClick={handleClick}
              >
                Recurring Subscription
              </button>
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
