/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };


const AuthContext = createContext();

const initialState={
    user:null,
    isAuthinecated:false
}
function reducer(state,action){
    switch(action.type){
        case "login":
            return {
                ...state,user:action.payload,isAuthinecated:true
            }
            case "logout":
                return{
                    ...state,user:null,isAuthinecated:false
                }
            default:throw new Error("Invalid action");
    }
}

function AuthProvider({children}){
    const [{user,isAuthinecated},dispatch]=useReducer(reducer,initialState)

    function login(email ,password) {
        if(email ===FAKE_USER.email && password ===FAKE_USER.password){
            dispatch({type: 'login', payload:FAKE_USER})
            return true
        }
        return false
    }
    function logout(){
        dispatch({type: 'logout'})
    }
   return <AuthContext.Provider
   value={{
    user, isAuthinecated,
    login,logout
   }}
   >
        {children}
    </AuthContext.Provider>
}



function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("Auth is used outside its provider")
    }
    return context
}

export {AuthProvider, useAuth}