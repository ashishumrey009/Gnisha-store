import {Segment} from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import {parseCookies} from 'nookies'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { useState } from 'react'
import cookie from 'js-cookie'
import catchErrors from '../utils/catchErrors'
function Cart({products,user}) {
  const [cartProducts,setCartProducts]= useState(products)
  const [success,SetSuccess] = useState(false)
  const [loading,SetLoading] =useState(false)
  async function handleRemoveFromCart(pid){
    
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    const payload={
      params:{pid},
      headers:{ Authorization:token}

    }
   
    const response = await axios.delete(url,payload)

    setCartProducts(response.data)

  }
  async function  handelCheckOutFunction(paymentData){
    
    try{
      SetLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = {paymentData}
      const headers ={ headers:{ Authorization:token}}
      await axios.post(url,payload,headers)
      SetSuccess(true)
    }catch(error){
      catchErrors(error,window.alert)
    }finally{
      SetLoading(false)
    }
  }
  return (
    <Segment loading={loading}>
      <CartItemList 
      handleRemoveFromCart={handleRemoveFromCart} user={user} products={cartProducts}
      success={success}
      />
      <CartSummary user={user} products={cartProducts} 
       handelCheckOutFunction={handelCheckOutFunction}
       success={success}
       />
    </Segment>
  )
}
Cart.getInitialProps =  async ctx =>{
const {token} = parseCookies(ctx)

if(!token){
  return {products:[]}
}
const url = `${baseUrl}/api/cart`
const payload = { headers:{ Authorization:token}}
const response = await axios.get(url,payload)
return {products:response.data}
}
export default Cart;
