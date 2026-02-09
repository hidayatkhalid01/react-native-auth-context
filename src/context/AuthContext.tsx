import { router } from "expo-router";
import { createContext, useContext, useState } from "react";
import { mockSignIn, mockSignUp } from "../mock/auth.mock";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    isLoading: boolean;
    user: any | null;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    register: (name: string, phone: string, email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextProps>({
    signIn: async () => { },
    signOut: async () => { },
    register: async () => { },
    isLoading: false,
    user: null
});

type User = {
    id: number;
    name: string;
    email: string;
}

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // function to login
    // need to pass success, message, data (DONE)
    // need to save data to async storage for expo (DONE)
    // will navigate to home page (DONE)
    // to mock login api (DONE)
    // api should pass id, email, name, avatar, token (DONE)
    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await mockSignIn(email, password);

            if (response.success && response.token) {
                await AsyncStorage.setItem('token', response.token!);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));

                setUser({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email
                })

                router.push('/(postLogin)');
                return response;
            }
            return response;
        } catch (e) {
            return { success: false, message: 'Error occured: ' + e };
        }finally{
            setIsLoading(false);
        }
    }

    // to remove async storage token 
    // navigate to login page (done)
    const signOut = async () => {
        setUser(undefined);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        router.push('/login');
    }


    const register = async (name: string, phone: string, email: string, password: string) => {
        try{
            setIsLoading(true);
            const response = await mockSignUp({name, phone, email, password});
            if(response.success){
                await AsyncStorage.setItem('token', response.token!);
               
                if(response.user){
                    await AsyncStorage.setItem('user', JSON.stringify(response.user));
                    setUser({
                        id: response.user.id,
                        name: response.user.name ?? "NA",
                        email: response.user.email
                    })
                }
                
                router.push('/(postLogin)');
            }
            return response;
        }catch(e){  
            return {success: false, message: 'Error occured: ' + e};
        }finally{
            setIsLoading(false);
        }
        
    }


    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            register,
            user,
            isLoading,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider