import { createContext, useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import { Magic } from 'magic-sdk'
import { MAGIC_PUBLIC_KEY } from '../utils/urls'
import { API_URL } from '../utils/urls'

const AuthContext = createContext();

let magic;

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)//email id
    const router = useRouter();

    const loginUser = async (email) => {
        try{
            await magic.auth.loginWithMagicLink({email});
            setUser(email);
            router.push('/');
        }catch(error){
            setUser(null);
            console.log(error);
        }
    }
    const logoutUser = async () => {
        try {
            await magic.user.logout();
            setUser(null);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect( async () => {
        magic = new Magic(MAGIC_PUBLIC_KEY);
        await checkUserLoggedIn();
    }, [])

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();
            if(isLoggedIn){
                const { email } = await magic.user.getMetadata();
                const token = await getToken();
                console.log(token)
                
                const res = await fetch(`${API_URL}/users/me`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const {id} = await res.json();
                setUser({ email, id });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken();
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext
