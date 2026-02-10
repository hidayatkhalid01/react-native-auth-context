import { render, fireEvent, act } from '@testing-library/react-native';

import LoginPage from '@/app/login';

describe('<Login />', () => {
    it('shows error if email is empty', async () => {
        const { getByText } = render(<LoginPage />);

        await act(async () => {
            fireEvent.press(getByText('Sign In'));
        })

        expect(getByText('Email is required')).toBeTruthy();
    });

    it('shows error if email is invalid', async () => {
        const { getByText, getByPlaceholderText } = render(<LoginPage />);

        fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalid-email');
        await act(async () => {
            fireEvent.press(getByText('Sign In'));
        })

        expect(getByText('Email must be a valid email address')).toBeTruthy();
    });

    it('shows error if password is too short', async () => {
        const { getByText, getByPlaceholderText } = render(<LoginPage />);

        fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@test.com');
        fireEvent.changeText(getByPlaceholderText('Enter your Password'), '123');
        await act(async () => {
            fireEvent.press(getByText('Sign In'));
        })

        expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    });

    it('calls signIn on valid input', async () => {
        const { getByText, getByPlaceholderText } = render(<LoginPage />);

        fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@test.com');
        fireEvent.changeText(getByPlaceholderText('Enter your Password'), 'password');
        await act(async () => {
            fireEvent.press(getByText('Sign In'));
        })
    });
})