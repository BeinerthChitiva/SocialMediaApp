import React, {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default: 
            return state
    }
}

//useReducer takes Reducer(reducer, initial state) and returns state and dispatch
function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState)

    //Now, we can use dispatch to dispatch any action and attach Type and Payload.
    //Which AuthReducer listens to...
    
    function login(userData){
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout(){
        localStorage.removeItem('jwtToken')
        dispatch({type: 'LOGOUT'})
    }

    return(
        <AuthContext.Provider
            /* What we pass here, we pass to all the Children Component */
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}
