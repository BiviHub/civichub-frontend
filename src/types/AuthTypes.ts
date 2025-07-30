export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string; // <-- Add this
    password: string;
    confirmPassword: string;
}

export interface AdminRegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordDTO {
    email: string;
}

export interface ResetPasswordDTO {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}
export interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    profilePictureUrl?: string; // Optional: may be null or missing
    role: string;
}

