import React, { useState, useEffect } from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {Form,Input,TextArea,Button,Image,Message,Header,Icon} from 'semantic-ui-react'
import catchErrors from '../utils/catchErrors'
const INITIAL_PRODUCT= {
  name:'',
  price:'',
  media:'',
  description:'',
}
function CreateProduct() {
  const [product,setProduct] =useState(INITIAL_PRODUCT)
  const [mediaPreview,setMediaPreview]=useState('')
  const [success,setSuccess]=useState(false)
  const [loading,setLoading] = useState(false)
  const [disabled,setDisabled] =useState(true)
  const [error,setError] =useState('')
  useEffect(()=>{
  const isProduct =Object.values(product).every(ele=>Boolean(ele))   
  isProduct?setDisabled(false):setDisabled(true)
  },[product])

  function handleChange (event){
    const {name,value,files} =event.target
    if(name === 'media'){
      setProduct(prevState =>({...prevState,media:files[0]}))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    }else{
    setProduct((prevState)=>({...prevState,[name]:value}))
  
    }
  }
  async function handleImageUpload(){
    const data = new FormData()
    data.append('file',product.media)
    data.append('upload_preset','reactreserve')
    data.append('cloud_name','doo7zsdii')
    const response =await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaUrl = response.data.url
    return mediaUrl
  }
  async function handleSubmit(event){
    try{
    event.preventDefault()
    setLoading(true)
    setError('')
    const mediaUrl = await handleImageUpload()

    const url=`${baseUrl}/api/product`
    const {name,price,description} =product
    const payload ={name,price,description,mediaUrl}
    const response = await axios.post(url,payload)

    setProduct(INITIAL_PRODUCT)
    setSuccess(true)
    // setLoading(false)

    }catch(error){
      catchErrors(error,setError)
      // setLoading(false)
      // console.error('ERROR',error)
    }finally{
      setLoading(false)
    }
    
    // console.log(product)

  }

  return (
 
    <>
    <Header as='h2' block>
    <Icon name='add' color='orange'/>
    Create New Product
    </Header>
    <Form loading={loading} success={success} error={Boolean(error)} onSubmit={handleSubmit}>
      <Message error header='oops!' content ={error}/>
      <Message  success icon='check' header='success' content='Your Product has been posted'/>
      <Form.Group widths='equal'>
        <Form.Field control ={Input} name='name' label='Name' value={product.name} placeholder='Name' onChange={handleChange}/>
        <Form.Field control ={Input} name='price' label='Price' value={product.price}  placeholder='Price' onChange={handleChange} min='0.0' step='1.0' type='number'/>
        <Form.Field control ={Input} name='media' type='file' label='Media' onChange={handleChange} content='Select Image' accept='image/*' />
      </Form.Group>
      <Image  src={mediaPreview} rounded centered size='small'/>
      <Form.Field 
      control={TextArea} 
      name='description' 
      label='Description' 
      placeholder='Description' 
      value={product.description}
      onChange={handleChange}
      />
      
      <Form.Field
      control={Button}
      disabled={disabled || loading}
      color='blue'
      icon ='pencil alternate'
      content = 'Submit'
      type='submit'
      />
    </Form>
   </>
  )
}

export default CreateProduct;
