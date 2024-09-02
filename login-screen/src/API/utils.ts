import axios, { AxiosResponse } from 'axios';
import { AuthenticationResponse } from '../Types/types';


export const registerUser = async (username: string, password: string, email: string, role: string): Promise<AuthenticationResponse> => {
  const data = JSON.stringify({
      username,
      password,
      email,
      role
  });

  const config = {
      method: 'post' as const,
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/register',
      headers: { 
          'Content-Type': 'application/json'
      },
      data
  };

  try {
      const response: AxiosResponse<AuthenticationResponse> = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error('Error during registration:', error);
      throw error;
  }
};


export const loginUser = async (username: string, password: string, email: string, role: string): Promise<AuthenticationResponse> => {
  const data = JSON.stringify({
      username,
      password,
      email,
      role
  });

  const config = {
      method: 'post' as const,
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/login',
      headers: { 
          'Content-Type': 'application/json'
      },
      data
  };

  try {
      const response: AxiosResponse<AuthenticationResponse> = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error('Error during login:', error);
      throw error;
  }
};



export const recoverForgotPassword = async (email: string): Promise<string> => {
  const data = JSON.stringify({ email });

  const config = {
      method: 'post' as const,
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/recover/forgot-password',
      headers: { 
          'Content-Type': 'application/json'
      },
      data
  };

  try {
      const response: AxiosResponse<string> = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error('Error during password recovery:', error);
      throw error;
  }
};

export const validateToken = async (token: string, authToken: string): Promise<string> => {
  const data = JSON.stringify({ token });

  const config = {
      method: 'post' as const,
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/recover/valid-token',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
      data
  };

  try {
      const response: AxiosResponse<string> = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error('Error during token validation:', error);
      throw error;
  }
}


export const restorePassword = async (user: string, newPassword: string, authToken: string): Promise<string> => {
  const data = JSON.stringify({ user, newPassword });

  const config = {
      method: 'post' as const,
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/restore-password',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
      data
  };

  try {
      const response: AxiosResponse<string> = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error('Error during password restoration:', error);
      throw error;
  }
};
