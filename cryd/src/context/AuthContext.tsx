import { FC, createContext, useState } from "react";
import { LoginDTO } from "../model/LoginDTO";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const AuthContext = createContext({});

const AuthProvider: FC<any> = ({children}) => {

    const [token, setToken] = useState('')
    const navigate = useNavigate();
    
    const handleLogin = async (user: LoginDTO) =>{
        try {
            const {data: token} = await api.post('/auth', user);
            setToken(token);
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = token;
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
        <AuthContext.Provider value={{handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider