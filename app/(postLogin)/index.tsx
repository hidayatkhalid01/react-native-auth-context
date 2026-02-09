import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
    id: number;
    name: string;
    email: string;
}

export default function Postlogin(){
    const { signOut, user } = useAuth();

    const [authUser, setAuthUser] = useState<User | null>(null);
    useEffect(() => {
        if(!user) {
            fetchUserOnLoad();
        }else{
            setAuthUser(user);
        }
    }, []);

    const fetchUserOnLoad = async () => {
        const user = await AsyncStorage.getItem('user');
        if(user){
            setAuthUser(JSON.parse(user));
        }
        
    }

    if(!user) {
        fetchUserOnLoad();
    }

    return (
        <SafeAreaView className='bg-white flex flex-1 p-5 items-center justify-center text-center'>
            <Box className='flex flex-col gap-5'>
                <Text className="text-2xl font-semibold text-center">Welcome {authUser?.name}!</Text>
                <Text className="text-center">Your email is {authUser?.email}</Text>
                <Button onPress={signOut}>
                    <ButtonText>Logout</ButtonText>
                </Button>
            </Box>
        </SafeAreaView>
    )
}