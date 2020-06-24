import React from 'react';
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'
import ProductPagination from '../components/Index/ProductPagination'
function Home({products,totalPages}) {
  return (
  <>
  <ProductList  products ={products} />
    <ProductPagination  totalPages ={totalPages}/>
    </>
    )
}
Home.getInitialProps= async ctx =>{

  const page =ctx.query.page ? ctx.query.page:"1"
  const size=6
  //fetch from server
  const url =`${baseUrl}/api/products`
  const payload={params:{page,size}}
  const response =  await axios.get(url,payload)
  //return response as object
  // note:
  //return {hello:'world'}
  return  response.data
}

export default Home;
