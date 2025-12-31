const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/pmcc/v1';

export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  result: {
    token: string;
  };
}

export const loginApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('Calling API:', API_BASE_URL + '/auth/login');

    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: credentials.account,
        password: credentials.password,
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Dang nhap that bai');
    }

    const data: LoginResponse = await response.json();
    console.log('Response data:', data);

    if (data.code === 0 && data.result?.token) {
      localStorage.setItem('authToken', data.result.token);
      return data;
    }

    throw new Error('Sai tai khoan hoac mat khau');
  },

  logout(): void {
    localStorage.removeItem('authToken');
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};
