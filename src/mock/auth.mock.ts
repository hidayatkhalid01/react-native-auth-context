export const mockSignIn = async (email: string, password: string) => {
    await new Promise(res => setTimeout(res, 800));
    if(email === 'admin@test.com' && password === 'admin1234'){
        return {
            success: true,
            message: 'Login successful',
            token: 'mock-jwt-token',
            user: {
                // to pass related user data here
                id: 1234,
                email: "admin@test.com",
                name: "Admin"
            }
        }
    }
    return {
        success: false,
        message: 'Invalid credentials'
    }
}

// need to mock if email already exists

export const mockSignUp = async({
    name,
    phone,
    email,
    password
}: {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
}) => {
    await new Promise(res => setTimeout(res, 800));
    if(email === 'admin@test.com'){
        return {
            success: false,
            errors: {
                email: 'Email already exists'
            }
        }
    }
    if(email === 'admin2@test.com' && password === 'admin1234'){
        return {
            success: true,
            message: 'Registration successful',
            token: 'mock-jwt-token-1',
            user: {
                // to pass related user data here
                id: 1235,
                email: email,
                avatar: "",
                name: name
            }
        }
    }
    return {
        success: false,
        message: 'Errors signing up',
        errors: {
            invalid: "You need to sign up with email = admin2@test.com for this demo"
        }
    }
}

