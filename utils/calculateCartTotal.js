function calculateCartTotal(products){
    const total =products.reduce((acc,ele)=>{
    acc+= ele.product.price * ele.quantity
    return acc
    },0)
    const cartTotal = ((total*100)/100).toFixed(2)
    const stripeTotal = Number (Math.round((((total*100)/100).toFixed(2))))
    return {cartTotal,stripeTotal}
}
export default calculateCartTotal