function catchErrors(error,displayError){
    let errorMsg;
    if(error.response){
        errorMsg=error.response.data
        console.error('Error response',errorMsg)
        //for cloudnary image
        if(error.response.data.error){
            errorMsg = error.response.data.error.message
        }
    }else if(error.request){
        // The request was made but no response was recieved
        errorMsg = error.request
        console.error('Error Request',errorMsg)
    }else{
        //something else happend in making request that triggered
        errorMsg = error.message
        console.error('Error Request',errorMsg)
    }

    displayError(errorMsg);
}
export default catchErrors