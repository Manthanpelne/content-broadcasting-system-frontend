import { apiClient } from "@/lib/api-client";

export const AuthService = {
  async login(credentials) {
    // The UI component doesn't know this is being mocked!
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data.user;
  }
};