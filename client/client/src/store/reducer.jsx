const initializeState = {
    isLoggedIn: false
}

const reducerer = (state=initializeState,action)=>{
    switch(action.type){
        case 'ON_LOGGED_IN':
            return {
                ...state,
                isLoggedIn:true
            };
        case 'ON_LOG_OUT':
            return {
                ...state,
                isLoggedIn: false
            };
    }
    return state;
}

export default reducerer;
