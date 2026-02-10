import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView className='bg-background-800 flex flex-1 p-5 justify-center items-center gap-5'>
      <Text className="text-secondary-500 text-5xl font-black text-center">Welcome to My App</Text>
      <Text className='text-secondary-500 text-center text-lg'>This is my demo app for login functionality. Please proceed to sign in or create an account.</Text>
      <Box className='flex flex-col gap-2 w-full'>
        <Button className="bg-primary-500" onPress={() => router.push('/login')}>
          <ButtonText>Sign In</ButtonText>
        </Button>
        <Button variant='outline' className='border-secondary-500' onPress={() => router.push('/signup')}>
          <ButtonText className='text-secondary-500'>Sign Up</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}
