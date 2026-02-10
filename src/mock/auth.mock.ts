/**
 * Mock sign in API to test the login feature.
 * It takes email and password as parameters and returns a promise.
 * If the email is 'admin@test.com' and the password is 'admin1234', it will return a response with success true, message 'Login successful', token 'mock-jwt-token', and user data.
 * If the credentials are invalid, it will return a response with success false and message 'Invalid credentials'.
 * The response will be delayed by 800 milliseconds to simulate a network request.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{success: boolean, message: string, token?: string, user?: {id: number, email: string, name: string}>>}
 */
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


/**
 * Mock sign up API to test the registration feature.
 * It takes name, phone, email, and password as parameters and returns a promise.
 * If the email is 'admin@test.com', it will return a response with success false and an error message 'Email already exists'.
 * If the email is 'admin2@test.com' and the password is 'admin1234', it will return a response with success true, message 'Registration successful', token 'mock-jwt-token-1', and user data.
 * If the credentials are invalid, it will return a response with success false and message 'Errors signing up' and an error message 'You need to sign up with email = admin2@test.com for this demo'.
 * The response will be delayed by 800 milliseconds to simulate a network request.
 * @param {{name?: string; phone?: string; email?: string; password?: string;}} - An object containing the user's name, phone, email, and password.
 * @returns {Promise<{success: boolean; message: string; token?: string; user?: {id: number; email: string; name: string; avatar: string}; errors?: {invalid?: string; email?: string; password?: string}>>}
 */
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

