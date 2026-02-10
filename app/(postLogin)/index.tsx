import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
    id: number;
    name: string;
    email: string;
}

export default function Postlogin(){
    const { signOut, user, fetchUser } = useAuth();

    const fetchUserOnLoad = useCallback(async () => {
        await fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        console.log("user", user);
        if(!user) {
            fetchUserOnLoad();
        }
    }, [user, fetchUserOnLoad]);

    return (
        <SafeAreaView className='bg-background-800 flex flex-1 p-5 items-center justify-center text-center'>
            <Box className='flex flex-col gap-5'>
                <Text className="text-2xl font-bold text-center text-secondary-500">Welcome {user?.name}!</Text>
                <Text className="text-center text-secondary-500">Your email is {user?.email}</Text>
                <Button onPress={signOut} className="bg-primary-500">
                    <ButtonText>Logout</ButtonText>
                </Button>
            </Box>
        </SafeAreaView>
    )
}