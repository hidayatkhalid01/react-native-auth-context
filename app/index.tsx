import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  return (
    <Box className='bg-background-300 flex items-center justify-center flex-1'>
      <Text className="text-black text-3xl font-black">Welcome to My App</Text>
      <Text>This is my demo app for login functionality. Please sign in</Text>
      <Box className='flex flex-col gap-2'>
        <Button className="bg-primary-500" onPress={() => router.push('/login')}>
          <ButtonText>Sign In</ButtonText>
        </Button>
        <Button className="bg-primary-200" onPress={() => router.push('/signup')}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
