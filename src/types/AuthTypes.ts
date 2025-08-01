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
export interface FlaggedReportDTO {
    reportId: number;
    flaggedByUserId: string;
    reason: string;
    flaggedBy: string;
    isReviewed: boolean;
}
export interface ReportPhoto {
    id: number;
    photoUrl: string;
}
export interface CommentDTO {
    id: number;
    content?: string;
    userName?: string;
    dateCreated: string; // ISO string format from DateTime
    parentCommentId?: number;
    replies: CommentDTO[];
}
export interface ReactionDTO {
    id: number;
    type: string;
    reactedBy: string;
    reactedAt: string;
}
export interface ReportDTO {
    id: number;
    location?: string;
    description?: string;
    citizenId: string;
    citizenName?: string;
    dateCreated: string;
    photos: ReportPhoto[];
    comments: CommentDTO[];
    reactions: ReactionDTO[];
}
export interface AdminDashboardDTO {
    reportsCount: number;
    usersCount: number;
    flaggedPostCount: number;
    reviewedFlaggedCount: number;
    weeklyActivitiesCount: number;
}
