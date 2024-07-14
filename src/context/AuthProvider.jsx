import React, {createContext, useState, useEffect, useContext} from 'react'

// custom import
import client from '../api/client'
import loginApi from '../api/login'
import registerApi from '../api/register'
import logoutApi from '../api/logout'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            client.get('/users/me/')
            .then(response => {
                console.log('user data is ', response.data)
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
              localStorage.removeItem('token');
              setLoading(false);
              console.log("couldn't get user token")
            });
        } else {
          setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
    try {
        const response = await loginApi.login(username, password)
        console.log("login successful", response.data)
        localStorage.setItem('token', response.data.key);
        setUser(response.data.user);
        return response.data;
    } catch (error) {
        console.log("login failed", error.response.data);
    }
    };

    const register = async (username, email, password1, password2) => {
        try {
          const response = await registerApi.resister(username, email, password1, password2);
          console.log("registered user successfully", response.data)
          localStorage.setItem('token', response.data.key);
          setUser(response.data.user);
          return response.data;
        } catch (error) {
          console.log("error registering user", error);
        }
      };

    const logout = async () => {
        try {
            await logoutApi.logout();
            localStorage.removeItem('token');
            setUser(null);
            console.log("user logged out")
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

  return (
    <AuthContext.Provider value={{user, login, register, logout, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=> useContext(AuthContext)

export default AuthProvider