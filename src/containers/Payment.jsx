import React, {useContext} from 'react'
import AppContext from '../context/AppContext';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Payment.css';

const Payment = () => {
  const {state, addNewOrder} = useContext(AppContext);
  const {cart, buyer} = state;
  const navigate = useNavigate();
  const paypalOptions = {
    clientId: 'AZkSpCa_0_PDbLMXXWQ_KN-il_pby3S3Bq-gojuWdzGOX3nifyJUhHWyKbAa9N7XZdTJRyCdSx3SOmnv',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }
  const handlePaymentSuccess = (data) => {
    console.log(data);
    if(data.status === 'COMPLETED'){
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      navigate('/checkout/success')
    }
  }
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }
  
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item, index) => (
          <div className="Payment-item" key={index} >
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))
        }
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={ () => console.log('StartPayment')}
            onSuccess={data => handlePaymentSuccess(data)}
            onApprove={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel= {data => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Payment;