
const initialState = {
  loginToken : localStorage.getItem('token')?localStorage.getItem('token'):'',
	loginMobile : localStorage.getItem('mobile')?localStorage.getItem('mobile'):'',
	serviceId : ''
}

export default (state = initialState, action) => {
  const newState = {...state};
  if(action.type === "UPDATE_TOKEN"){
    newState.loginToken = action.payload;
  }
  if(action.type === "UPDATE_MOBILE"){
    newState.loginMobile = action.payload;
  }
  if(action.type === "UPDATE_SERVICEID"){
    newState.serviceId = action.payload;
  }

  return newState;
}