import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertCircleIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const { signIn, isLoading } = useAuth();

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        invalid?: string;
    }>({});

    const isValidEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // need to mimic Login API
    // will navigate to postlogin if success
    // will show error if failed
    // do validation here
    const handleLogin = async () => {
        if (email.length === 0) {
            setErrors({ email: 'Email is required' });
            return;
        }

        if(!isValidEmail(email)){
            setErrors({ email: 'Email must be a valid email and has no whitespace' });
            return;
        }

        if (password.length < 6) {
            setErrors({ password: 'Password must be at least 6 characters' });
            return;
        }

        setErrors({});
        const result = await signIn(email, password);

        if (!result.success) {
            setErrors({ invalid: result.message });
        }
    }
    return (
        <SafeAreaView className='bg-white flex flex-1 p-5'>

            <Box className="flex flex-col gap-2">
                 {/* top - for back button */}
                <Box className="flex ">
                    <Button className="rounded-full bg-background-100p-3 w-12" size="lg" onPress={() => router.dismissTo('/')}>
                        <ButtonIcon as={ArrowLeftIcon} color="black" />
                    </Button>
                </Box>

                {/* text */}
                <Box className="mb-5">
                    <Text className="font-black text-7xl">Lets sign you in!</Text>
                    <Text className="text-3xl">Welcome back</Text>
                </Box>
            </Box>

            {/* sign in  */}
            <Box className="w-full flex flex-col gap-2">
                <FormControl isInvalid={!!errors.email || !!errors.invalid} isRequired>
                    <FormControlLabel>
                        <FormControlLabelText>Email Address</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="lg">
                        <InputField placeholder="Enter your email" type="text" value={email} onChangeText={setEmail} />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                        <FormControlErrorText className="text-red-500">
                            {errors.email || errors.invalid}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl isInvalid={!!errors.password || !!errors.invalid} isRequired>
                    <FormControlLabel>
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="lg">
                        <InputField type={showPassword ? 'text' : 'password'} placeholder="Enter your Password" value={password} onChangeText={setPassword} className="border-pink-500" />
                        <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                            <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                        </InputSlot>
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                        <FormControlErrorText className="text-red-500">
                            {errors.password || errors.invalid}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <Button onPress={handleLogin} isDisabled={isLoading}>
                    {isLoading && <ButtonSpinner color="gray" />}
                    <ButtonText>Sign In</ButtonText>
                </Button>

                <Box className="flex items-center justify-center relative">
                    <Text className="bg-white z-10 px-2">Or sign in with</Text>
                    <Box className="absolute left-0 right-0 bg-background-500 h-0.5 z-0">
                    </Box>
                </Box>

                <Button className="bg-white" variant="outline">
                    <ButtonIcon>
                        <AntDesign name="google" size={24} color="#fff" />
                    </ButtonIcon>
                    <ButtonText>Continue with Google</ButtonText>
                </Button>

                <Text className="text-center">Don't have an account? <Text className="text-info-500 font-semibold" onPress={() => router.push('/signup')}>Sign Up</Text></Text>
            </Box>
        </SafeAreaView>
    )
}