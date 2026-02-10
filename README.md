# Login App Demo

This is a authentication demo application demonstrated using React Native, React Context, Expo framework and GlueStack UI library. Feel free to explore my code.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the related packages.

```bash
npm install
```

## How to start
1. Run ```npx expo start```
2. The QR code will appear in the terminal. Make sure you are connected to the same wifi network for laptop and mobile.
3. Scan the QR code using camera (IOS) or Expo Go app (Android).
4. Now you can access the app.

Reference: [Expo Documentation](https://docs.expo.dev/guides/overview/)
## Feature
1. A simple and straightforward **Authentication feature** which includes validation.
2. Saving the token to **Async Storage** for security and easy to log in when refreshing the app.
3. The use of **Design Token** by Tailwindcss to make the UI look consistent and systematic throughout the app 
4. Theme change (Light & Dark) enabled.

## Usage
1. **Log In** - Use email as (admin@test.com) and password as (admin1234)
2. **Sign Up** - Add anything for name and phone number, then email as (admin2@test.com) and password as (admin1234) to sign up
3. **Log out** - Press 'Logout' button in postlogin page to redirected back to Login page.
4. You can play with mock API files to change the output of the result.