import {Input} from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import catchErrors from '../../utils/catchErrors'
function AddProductToCart({user,productId}) {
  const [quantity,SetQunatity]= useState(1)
  const [loading,SetLoading] = useState(false)
  const [success,SetSuccess] = useState(false)
  const router = useRouter()
  useEffect (()=>{
    let timeout;
    if(success){
      timeout =setTimeout(()=>SetSuccess(false),3000)
    }
    return () =>{
      clearTimeout(timeout)
    }
  },[success])
  async function handleAddProductToCart (){
    try{
      SetLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = {quantity,productId}
      const token = cookie.get('token')
      const headers = {headers:{ Authorization:token}}
      await axios.put(url,payload,headers)
      SetSuccess(true)
    }catch(error){
      catchErrors(error,window.alert)
    }finally{
      SetLoading(false)
    }
   

  }
  return <Input type='number' min='1' placeholder='Quantity'
  value={quantity}
  onChange ={event =>SetQunatity(Number(event.target.value))}
  action={
    user && success ?{
      color:'blue',
      content:'Item Added',
      icon:'plus cart',
      disabled:true
    }:
    user?{
    color:'orange',
    content: 'Add To Cart',
    icon:'plus cart',
    loading,
    disabled:loading,
    onClick: handleAddProductToCart
  }:{
    color:'blue',
    content:'Sign Up to Purchase',
    icon:'signup',
    onClick:()=>router.push('/signup')
  }}
  />
}

export default AddProductToCart;
