// authService.ts
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

export const getAdminDashboard = async (): Promise<AdminDashboardDTO> => {
    const response = await api.get('/Admin/AdminDashboard');
    return response.data;
};

export const getAllFlaggedReports = async (): Promise<FlagReportDTO[]> => {
    const response = await api.get('/Report/AllFlaggedReport');
    return response.data;
};

export const getAllReports = async (): Promise<ReportDTO[]> => {
    const res = await api.get("/Report/AllReport");
    return res.data;
};

export const createReport = async (data: CreateReportDTO): Promise<number> => {
    const formData = new FormData();
    formData.append('Location', data.Location ?? '');
    formData.append('Description', data.Description ?? '');
    data.Photos?.forEach(photo => formData.append('Photos', photo));

    const response = await api.post('/Report/createReport', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const addComment = async (reportId: number, dto: AddCommentDTO) => {
    const res = await api.post(`/Report/${reportId}/comments`, dto);
    return res.data;
};

export const toggleReaction = async (reportId: number, dto: AddReactionDTO) => {
    const res = await api.post(`/Report/${reportId}/reactions`, dto);
    return res.data;
};

export const flagReport = async (dto: FlagReportDTO) => {
    const res = await api.post("/Report/flagReport", dto);
    return res.data;
};

export const reviewFlag = async (flagId: number, deleteReport: boolean, adminId: string): Promise<string> => {
    const response = await api.post('/Report/ReviewFlag', null, {
        params: { flagId, deleteReport, adminId }
    });
    return response.data;
};

// services/authService.ts (or ../api file)
export const getMyReports = async (): Promise<ReportDTO[]> => {
    const res = await api.get('/Report/MyReports');
    // Some server responses might return { Message: "You haven't made any post" } when empty.
    // Normalize to an array here so callers don't need to handle two shapes.
    if (!res || !res.data) return [];
    return Array.isArray(res.data) ? (res.data as ReportDTO[]) : [];
};

// New function for updating profile
export const updateProfile = async (profileData: ProfileDTO): Promise<{ message: string }> => {
    const response = await api.put('/Account/update-profile', profileData);
    return response.data;
};