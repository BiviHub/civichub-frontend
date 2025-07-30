import api from '../api';
import type {
    LoginDTO,
    RegisterDTO,
    UserDTO,
    AdminRegisterDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO
} from '../types/AuthTypes';

export const login = async (loginData: LoginDTO) => {
    try {
        const response = await api.post('/Account/Login', loginData);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const registerUser = async (data: RegisterDTO) => {
    const response = await api.post('/Account/Register', data);
    return response.data;
};

export const registerAdmin = async (data: AdminRegisterDTO) => {
    const response = await api.post('/Account/AdminRegister', data);
    return response.data;
};

export const logout = async () => {
    try {
        const response = await api.post('/Account/Logout');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const forgotPassword = async (data: ForgotPasswordDTO) => {
    const response = await api.post('/Account/ForgotPassword', data);
    return response.data;
};

export const resetPassword = async (data: ResetPasswordDTO): Promise<{ message: string }> => {
    const response = await api.post('/Account/ResetPassword', data);
    return response.data;
};

export const getAllUsers = async (): Promise<UserDTO[]> => {
    const response = await api.get('/Account/AllUsers');
    return response.data;
};

