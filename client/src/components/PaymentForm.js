import React, { useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import { useState } from 'react';
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
  const { id } = useParams();
  console.log('id', id);
  const [amount, setAmount] = useState(0);
  const queryParams = new URLSearchParams(window.location.search);
  const amounts = queryParams.get('amount');
  console.log('amount', amounts);
  const [disabled, setDisabled] = useState(false);
    useEffect(() => {
      console.log("Payment form mounted");
      setAmount(amounts);
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
        setDisabled(true);
        axios.post(`/payment?card_number=${formData.cardNumber}&expiry_date=${formData.expiryDate}&cvv=${formData.cvv}&amount=${amount}&userId=${id}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });

      setTimeout(function(){navigate(`/user-info/${id}`)}, 5000);
    }

    /* const handleClick = (event) => {
        navigate('/recurring');
    } */

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
              <button type="submit" disabled={disabled}>
                {`Pay $${amount}`}
              </button>
              {/* <button
                type="button"
                onClick={handleClick}
              >
                Recurring Subscription
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
