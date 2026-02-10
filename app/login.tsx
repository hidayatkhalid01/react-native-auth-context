import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertCircleIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { useAuth } from "@/src/context/AuthContext";

import { Keyboard } from "react-native";
import { isValidEmail } from "@/src/helpers/ValidateEmail";

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

    // need to mimic Login API
    // will navigate to postlogin if success
    // will show error if failed
    // do validation here
    // implement useCallback 
    const handleLogin = useCallback(async () => {
        const newErrors: Record<string, string> = {};
        if (email.length === 0) {
            newErrors.email = 'Email is required';
        }else if(!isValidEmail(email)){
            newErrors.email = "Email must be a valid email address";    
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try{
            const result = await signIn(email, password);
            Keyboard.dismiss();
            if (!result.success) {
                setErrors({ invalid: result.message });
            }
        }catch(err: any){
            setErrors({ invalid: err?.message ?? "Something went wrong" });
        }
    }, [email, password, signIn]);

    return (
        <SafeAreaView className='bg-background-800 flex flex-1 p-5'>

            <Box className="flex flex-col gap-2">
                 {/* top - for back button */}
                <Box className="flex ">
                    <Button variant="outline" className="rounded-full border-secondary-500 p-3 w-12" size="lg" onPress={() => router.dismissTo('/')}>
                        <ButtonIcon as={ArrowLeftIcon} className="text-secondary-500" />
                    </Button>
                </Box>

                {/* text */}
                <Box className="mb-5">
                    <Text className="font-black text-secondary-500 text-7xl">Lets sign you in!</Text>
                    <Text className="text-3xl text-secondary-500">Welcome back</Text>
                </Box>
            </Box>

            {/* sign in  */}
            <Box className="w-full flex flex-col gap-2">
                <FormControl isInvalid={!!errors.email || !!errors.invalid} isRequired>
                    <FormControlLabel>
                        <FormControlLabelText className="text-secondary-500">Email Address</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="lg">
                        <InputField placeholder="Enter your email" className="text-secondary-500" type="text" value={email} onChangeText={setEmail} />
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
                        <FormControlLabelText className="text-secondary-500">Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="lg">
                        <InputField type={showPassword ? 'text' : 'password'} placeholder="Enter your Password" value={password} onChangeText={setPassword} className="text-secondary-500"  />
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

                <Button onPress={handleLogin} isDisabled={isLoading} className="bg-primary-500">
                    {isLoading && <ButtonSpinner color="gray" />}
                    <ButtonText>Sign In</ButtonText>
                </Button>

                <Box className="flex items-center justify-center relative">
                    <Text className="bg-background-800 z-10 px-2 text-secondary-500">Or sign in with</Text>
                    <Box className="absolute left-0 right-0 bg-background-500 h-0.5 z-0">
                    </Box>
                </Box>

                <Button className="border-secondary-500" variant="outline">
                    <ButtonText className="text-secondary-500">Continue with Google</ButtonText>
                </Button>

                <Text className="text-center text-secondary-500">Don't have an account? <Text className="text-info-500 font-semibold" onPress={() => router.push('/signup')}>Sign Up</Text></Text>
            </Box>
        </SafeAreaView>
    )
}