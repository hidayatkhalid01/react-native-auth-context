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
    fetchUser: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps>({
    signIn: async () => { },
    signOut: async () => { },
    register: async () => { },
    fetchUser: async () => { },
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
    
    
    /**
     * notes: 
     * function to login
     * need to pass success, message, data (DONE)
     * need to save data to async storage for expo (DONE)
     * will navigate to home page (DONE)
     * to mock login api (DONE)
     * api should pass id, email, name, avatar, token (DONE)
     * 
     * Signs in a user with given email and password.
     * If the sign in is successful, it will store the token and user data in AsyncStorage.
     * Then it will set the user state to the signed in user and navigate to "/(postLogin)".
     * If there is an error, it will return a response with success false and a message with the error.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<{success: boolean, message: string, user?: {id: number, name: string, email: string}>>}
     */
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

    /**
     * Signs out a user by removing the token and user from async storage.
     * Then navigates to the login page.
     * @returns {Promise<void>} - A promise that resolves when the user is signed out.
     */
    const signOut = async () => {
        setUser(undefined);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        router.push('/login');
    }

    /**
     * Registers a user with name, phone, email and password.
     * 
     * @param {string} name - The name of the user.
     * @param {string} phone - The phone number of the user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * 
     * @returns {Promise<{success: boolean, message: string, user?: {id: number, name: string, email: string}>>}
     */
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


    /**
     * Fetches the user from AsyncStorage based on the token.
     * If the token is "mock-jwt-token", it will return the user with id 1234, name "Admin" and email "admin@test.com".
     * If the token is "mock-jwt-token-1", it will return the user with id 1235, name "Admin 2" and email "admin2@test.com".
     * 
     * @returns {Promise<{success: boolean, user?: {id: number, name: string, email: string}>>}
     */
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            if(token === 'mock-jwt-token'){
                const user = {
                    id: 1234,
                    name: "Admin",
                    email: "admin@test.com"
                }
                setUser(user);
                return {
                    success: true,
                    user: user
                }
            }else if(token === 'mock-jwt-token-1'){
                const user = {
                    id: 1235,
                    name: "Admin 2",
                    email: "admin2@test.com"
                }
                setUser(user);
                return {
                    success: true,
                    user: user
                }
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            register,
            fetchUser,
            user,
            isLoading,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider