/**
 * Checks if a given string is a valid email address.
 * This function uses a regular expression to test if the string
 * matches the typical email address format.
 * @param {string} email - The email address to be validated.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};