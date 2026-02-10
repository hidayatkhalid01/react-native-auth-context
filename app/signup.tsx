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
import { KeyboardAvoidingView, Platform } from "react-native";
import { isValidEmail } from "@/src/helpers/ValidateEmail";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, isLoading } = useAuth();

    const [errors, setErrors] = useState<{
        name?: string;
        phone?: string;
        email?: string;
        password?: string;
        invalid?: string;
    }>({});

    /**
     * Function to handle the registration process.
     * Do validations of name, phone, email and password.
     * If all validations are passed, call the register function from the auth context.
     * If the register function returns an error, set the errors state.
     * If the register function returns success, the auth contetx will handle the navigation process.
     * @returns {void} 
     */
    const handleRegister = useCallback(async () => {
        const newErrors: Record<string, string> = {};
        if (name.length === 0) {
            newErrors.name = 'Name is required';
        }

        if (phone.length === 0) {
            newErrors.phone = 'Phone is required';
        }

        if (email.length === 0) {
            newErrors.email = 'Email is required';
        }else if(!isValidEmail(email)){
            newErrors.email = "Email must be a valid email address and has no whitespace";    
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        };

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try{
            const result = await register(name, phone, email, password);

            if (!result.successs) setErrors(result.errors);
        }catch(err: any){
            setErrors({ invalid: err?.message ?? "Something went wrong while signing up." });
        }
    }, [name, phone, email, password]);


    return (
        <SafeAreaView className='bg-background-800 flex flex-1 p-5'>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Box className="flex flex-col gap-2 pb-5">
                    {/* top - for back button */}
                    <Box className="flex ">
                        <Button variant="outline" className="rounded-full border-secondary-500 p-3 w-12" size="lg" onPress={() => router.dismissTo('/')}>
                            <ButtonIcon as={ArrowLeftIcon} className="text-secondary-500" />
                        </Button>
                    </Box>


                    {/* text */}
                    <Box>
                        <Text className="font-black text-7xl text-secondary-500">Lets register account</Text>
                        <Text className="text-xl text-secondary-500">Hello user, you have a great journey</Text>
                    </Box>
                </Box>

                {/* sign in  */}
                <Box className="w-full flex flex-col gap-2">
                    <FormControl isInvalid={!!errors.name} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText className="text-secondary-500">Name</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Name" className="text-secondary-500" type="text" value={name} onChangeText={setName} />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                            <FormControlErrorText className="text-red-500">
                                {errors.name}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={!!errors.phone} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText className="text-secondary-500">Phone</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Phone" className="text-secondary-500" type="text" value={phone} onChangeText={setPhone} />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                            <FormControlErrorText className="text-red-500">
                                {errors.phone}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText className="text-secondary-500">Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Email" className="text-secondary-500" type="text" value={email} onChangeText={setEmail} />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                            <FormControlErrorText className="text-red-500">
                                {errors.email}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText className="text-secondary-500">Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField type={showPassword ? 'text' : 'password'} className="text-secondary-500" placeholder="Enter your Password" value={password} onChangeText={setPassword} />
                            <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                                <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                            </InputSlot>
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                            <FormControlErrorText className="text-red-500">
                                {errors.password}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={!!errors.invalid}>

                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                            <FormControlErrorText className="text-red-500">
                                {errors.invalid}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                </Box>

                <Button onPress={handleRegister} isDisabled={isLoading}>
                    {isLoading && <ButtonSpinner color="gray" />}
                    <ButtonText>Register</ButtonText>
                </Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}