import {Button ,Segment,Divider}  from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import calculateCartTotal from '../../utils/calculateCartTotal'
function CartSummary({products,handelCheckOutFunction, success}) {
  
  const [cartAmount,SetcartAmount] = useState(0)
  const [stripeAmount,SetstripeAmount] = useState(0)
  const [isCartEmpty,SetCartEmpty] = useState(false)
  useEffect(()=>{
    const {cartTotal,stripeTotal}= calculateCartTotal(products)
    SetcartAmount(cartTotal)
    SetstripeAmount(stripeTotal)
    SetCartEmpty(products.length==0)
  },[products])
  return <>
  <Divider/>
  <Segment clearing size='large'>
    <strong>Sub total:</strong>  ₹{cartAmount}
    <StripeCheckout
      name='Ginisha Place'
      amout={stripeAmount}
      image={products.length>0 ?products[0].product.mediaUrl: ""}
      currency="USD"
      shippingAddress={true}
      billingAddress={true}
      zipCode={true}
      token={handelCheckOutFunction}
      triggerEvent="onClick"
      stripeKey="pk_test_51GxDOJLMAayKBVi2l8sptlflrtVSt1fB6CqsUGiI3hfxTUHUf1o0HG6zGdNyDSZszkBMdIyyHUEOIUUVnO8SkNBQ00dfvL06SK"
    >
    <Button 
    disabled={isCartEmpty || success}
    icon ='cart' color='teal' floated='right' content='CheckOut'/>
    </StripeCheckout>
    
  </Segment>
  </>;
}

export default CartSummary;
