// auth.js - Utility for handling authentication token
import Cookies from "js-cookie";

const TOKEN_KEY = "token"; // Key used to store token

/**
 * Retrieve token from storage
 * @returns {string | null} The stored token or null if not found
 */
export function getToken() {
    return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
    return Cookies.remove(TOKEN_KEY);
}


/**
 * Check if a token exists
 * @returns {boolean} True if token exists, false otherwise
 */
export function isAuthenticated() {
    return !!getToken();
}
