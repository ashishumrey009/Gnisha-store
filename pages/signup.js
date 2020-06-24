import {Button ,Icon ,Form,Message,Segment} from 'semantic-ui-react'
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {handleLogin} from '../utils/auth'
const INITIAL_USER ={
  name:'',
  email:'',
  password:''
}
import Link from 'next/link'
import { useState, useEffect } from 'react'
function Signup() {
  const [user,setUser] = useState(INITIAL_USER)
  const [disabled,setDisabled] = useState(true)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  function handleChange (event){
    const {name,value} = event.target
    setUser(prevState=>({...prevState,[name]:value}))
  }
  useEffect(()=>{
    const isUser= Object.values(user).every(ele=>Boolean(ele))
    isUser ? setDisabled(false):setDisabled(true)
  },[user])
  async function handleSubmit (event){
    event.preventDefault()
    try{
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/signup`
      const payload = {...user}
      const response = await axios.post(url,payload)
    
      handleLogin(response.data)
    }catch(error){
      catchErrors(error,setError)
    }finally{
      setLoading(false)
    }
  }
  return <>
  <Message attached icon='setting' header='Get Started' content='Create new Accout' color='teal'/>
  <Form  error={Boolean(error)} loading ={loading} onSubmit={handleSubmit}>
    <Message error header='Oops' content={error}/>
    <Segment>
      <Form.Input  fluid icon='user' iconPosition='left' label='Name' placeholder='Name' name='name' onChange={handleChange} value={user.name}/>
      <Form.Input  fluid icon='envelope' iconPosition='left' label='Email' placeholder='Email' type='email' name='email' onChange={handleChange} value={user.email}/>
      <Form.Input  fluid icon='lock' iconPosition='left' label='Password' placeholder='Password' type='password' name='password' onChange={handleChange} value={user.password}/>
      <Button icon='signup' type='submit' color='orange' content='Signup' 
      disabled={disabled || loading} />
    </Segment>
  </Form>
  <Message attached='bottom' warning>
    <Icon name='help'/>  
    Existing user ? {' '}
    <Link  href='/login'>
      <a>Log in here</a>
    </Link>{' '}instead

  </Message>
 </>
}

export default Signup;
