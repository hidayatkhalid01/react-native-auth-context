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
import { KeyboardAvoidingView, Platform } from "react-native";

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

    const isValidEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // need to add validation here
    const handleRegister = async () => {
        if (name.length === 0) {
            setErrors({ name: 'Name is required' });
            return;
        }
        if (phone.length === 0) {
            setErrors({ phone: 'Phone is required' });
            return;
        }
        if (email.length === 0) {
            setErrors({ email: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            setErrors({ email: 'Email must be a valid email and has no whitespace' });
            return;
        }

        if (password.length < 6) {
            setErrors({ password: 'Password must be at least 6 characters' })
            return;
        };

        setErrors({});

        const result = await register(name, phone, email, password);

        if (!result.successs) setErrors(result.errors);
    }

    return (
        <SafeAreaView className='bg-white flex flex-1 p-5'>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Box className="flex flex-col gap-2 pb-5">
                    {/* top - for back button */}
                    <Box className="flex ">
                        <Button className="rounded-full bg-background-100p-3 w-12" size="lg" onPress={() => router.back()}>
                            <ButtonIcon as={ArrowLeftIcon} color="black" />
                        </Button>
                    </Box>


                    {/* text */}
                    <Box>
                        <Text className="font-black text-7xl">Lets register account</Text>
                        {/* <Text className="text-xl">Hello user, you have a great journey</Text> */}
                    </Box>
                </Box>

                {/* sign in  */}
                <Box className="w-full flex flex-col gap-2">
                    <FormControl isInvalid={!!errors.name} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText>Name</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Name" type="text" value={name} onChangeText={setName} />
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
                            <FormControlLabelText>Phone</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Phone" type="text" value={phone} onChangeText={setPhone} />
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
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size="lg">
                            <InputField placeholder="Email" type="text" value={email} onChangeText={setEmail} />
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