import App from "next/app";
import Layout from '../components/_App/Layout'
import {parseCookies,destroyCookie} from 'nookies'
import {redirectUser} from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from "axios";
import Router  from "next/router";
class MyApp extends App {
  static async getInitialProps({Component,ctx}){
    const {token} = parseCookies(ctx)
    // console.log('token is',token)
    let pageProps ={}
    if(Component.getInitialProps){
      pageProps= await Component.getInitialProps(ctx)
    }
    if(!token){
      const isProtectedRoute =ctx.pathname ==='/account' || ctx.pathname==='/create'
      if(isProtectedRoute){
          redirectUser(ctx,'/login')
      }}else{
        // console.log('elsepart')
        try{
          const payload = { headers:{ Authorization:token}}
          // console.log('payloadis',payload)
          const url = `${baseUrl}/api/account`
          const response = await axios.get(url,payload)
          // console.log('respose form api',response.data)
          const user = response.data
          const isRoot = user.role ==='root'
          const isAdmin = user.role ==='admin'
          const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname==='/create'
          if(isNotPermitted){
            redirectUser(ctx,'/')
          }
          pageProps.user=  user
        }catch(error){
          console.error('Error getting user',error)
          //throw invalid token
          destroyCookie(ctx,'token')
          redirectUser(ctx,'/login')

        }
      }
    
    return{ pageProps }
  }
  componentDidMount(){
    window.addEventListener('storage',this.syncLogout)
  }
  syncLogout =event=>{
    if(event.key === 'logout'){
      console.log('logged out')
      Router.push('/login')
    }
  }
  render() {
    const { Component,pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
