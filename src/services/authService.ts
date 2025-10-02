import api from '../api';
import type {
    LoginDTO,
    RegisterDTO,
    UserDTO,
    AdminRegisterDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    AdminDashboardDTO,
    CreateReportDTO,
    ReportDTO,
    AddCommentDTO,
    AddReactionDTO,
    FlagReportDTO,
    ProfileDTO,
    EditReportDTO,
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
    try {
        const response = await api.post('/Account/Register', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Registration failed. Check server status or contact support.');
        }
        throw error;
    }
};

export const registerAdmin = async (data: AdminRegisterDTO) => {
    try {
        const response = await api.post('/Account/AdminRegister', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Admin registration failed. Check server status or contact support.');
        }
        throw error;
    }
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
    try {
        const response = await api.post('/Account/ForgotPassword', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Password reset request failed. Check your email or contact support.');
        }
        throw error;
    }
};

export const resetPassword = async (data: ResetPasswordDTO): Promise<{ message: string }> => {
    try {
        const response = await api.post('/Account/ResetPassword', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Password reset failed. Check the token or contact support.');
        }
        throw error;
    }
};

export const getAllUsers = async (): Promise<UserDTO[]> => {
    try {
        const response = await api.get('/Account/AllUsers');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch users. Check server status.');
        }
        throw error;
    }
};

export const getAdminDashboard = async (): Promise<AdminDashboardDTO> => {
    try {
        const response = await api.get('/Admin/AdminDashboard');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to load admin dashboard. Check server status.');
        }
        throw error;
    }
};

export const getAllFlaggedReports = async (): Promise<FlagReportDTO[]> => {
    try {
        const response = await api.get('/Report/AllFlaggedReport');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch flagged reports. Check server status.');
        }
        throw error;
    }
};

export const getAllReports = async (): Promise<ReportDTO[]> => {
    try {
        const res = await api.get('/Report/AllReport');
        console.log('getAllReports response:', JSON.stringify(res.data, null, 2));
        return res.data;
    } catch (error: any) {
        console.error('getAllReports error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch reports.');
    }
};

export const createReport = async (data: CreateReportDTO): Promise<number> => {
    const formData = new FormData();
    formData.append('Location', data.Location ?? '');
    formData.append('Description', data.Description ?? '');
    formData.append('CitizenId', data.CitizenId ?? '');
    data.Photos?.forEach(photo => formData.append('Photos', photo));

    try {
        const response = await api.post('/Report/createReport', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to create report. Check server status.');
        }
        throw error;
    }
};

export const addComment = async (reportId: number, dto: AddCommentDTO) => {
    try {
        const res = await api.post(`/Report/${reportId}/comments`, dto);
        return res.data;
    } catch (error: any) {
        console.error('addComment error:', error.response?.data || error.message);
        throw new Error(error.response?.status === 401 ? 'Please log in to add a comment.' : error.response?.data?.message || 'Failed to add comment.');
    }
};

export const toggleReaction = async (reportId: number, dto: AddReactionDTO) => {
    try {
        const res = await api.post(`/Report/${reportId}/reactions`, dto);
        return res.data;
    } catch (error: any) {
        console.error('toggleReaction error:', error.response?.data || error.message);
        throw new Error(error.response?.status === 401 ? 'Please log in to react.' : error.response?.data?.message || 'Failed to add reaction.');
    }
};

export const flagReport = async (dto: FlagReportDTO) => {
    try {
        const res = await api.post('/Report/flagReport', dto);
        return res.data;
    } catch (error: any) {
        console.error('flagReport error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to flag report.');
    }
};

export const reviewFlag = async (flagId: number, deleteReport: boolean, adminId: string): Promise<string> => {
    try {
        const response = await api.post('/Report/ReviewFlag', null, {
            params: { flagId, deleteReport, adminId },
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to review flag. Check server status.');
        }
        throw error;
    }
};

export const getMyReports = async (): Promise<ReportDTO[]> => {
    try {
        const res = await api.get('/Report/MyReports');
        console.log('getMyReports response:', JSON.stringify(res.data, null, 2));
        if (!res || !res.data) return [];
        return Array.isArray(res.data) ? (res.data as ReportDTO[]) : [];
    } catch (error: any) {
        console.error('getMyReports error:', error.response?.data || error.message);
        throw new Error(error.response?.status === 401 ? 'Please log in to view your reports.' : error.response?.data?.message || 'Failed to fetch reports.');
    }
};

export const updateProfile = async (profileData: ProfileDTO): Promise<{ message: string }> => {
    try {
        const response = await api.put('/Account/update-profile', profileData);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to update profile. Check server status.');
        }
        throw error;
    }
};

export const editReport = async (reportId: number, dto: EditReportDTO): Promise<{ message: string; id?: number }> => {
    try {
        const response = await api.put(`/Report/reports/${reportId}`, dto);
        return response.data;
    } catch (error: any) {
        console.error('editReport error:', error.response?.data || error.message);
        throw new Error(
            error.response?.status === 401
                ? 'Please log in to edit this report.'
                : error.response?.data?.message || 'Failed to update report.'
        );
    }
};

export const deleteReport = async (reportId: number): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/Report/reports/${reportId}`);
        return response.data;
    } catch (error: any) {
        console.error('deleteReport error:', error.response?.data || error.message);
        throw new Error(
            error.response?.status === 401
                ? 'Please log in to delete this report.'
                : error.response?.data?.message || 'Failed to delete report.'
        );
    }
};