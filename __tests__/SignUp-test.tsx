import SignUpPage from "@/app/signup"
import { fireEvent, render, act } from "@testing-library/react-native";

describe('Sign Up page', () => {
    it('shows error when the name is empty', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUpPage />);

        fireEvent.changeText(getByPlaceholderText('Name'), '');
        await act(async () => {
            fireEvent.press(getByText('Register'));
        })

        expect(getByText('Name is required'))
    })

    it('shows error when the phone is empty', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUpPage />);

        fireEvent.changeText(getByPlaceholderText('Phone'), '');
        await act(async () => {
            fireEvent.press(getByText('Register'));
        })

        expect(getByText('Phone is required'))
    })

    it('shows error when the email is empty', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUpPage />);

        fireEvent.changeText(getByPlaceholderText('Email'), '');
        await act(async () => {
            fireEvent.press(getByText('Register'));
        })

        expect(getByText('Email is required'));
    })

    it('shows error when the email is invalid', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUpPage />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        await act(async () => {
            fireEvent.press(getByText('Register'));
        })

        expect(getByText('Email must be a valid email address and has no whitespace')).toBeTruthy();
    })

    it('show error when the password in less than 6 characters', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUpPage />);

        fireEvent.changeText(getByPlaceholderText('Enter your Password'), '1234');
        await act(async () => {
            fireEvent.press(getByText('Register'));
        })

        expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    })
})