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
    gender: string;
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
    profilePictureUrl?: string;
    role: string;
}

export interface FlagReportDTO {
    reportId?: number;
    reason?: string;
    // response-only fields:
    flaggedByUserId?: string;
    flaggedBy?: string;
    isReviewed?: boolean;
}


export interface ReportPhoto {
    id: number;
    photoUrl: string;
    reportId?: number;
}

export interface ReportComment {
    id?: number;
    content?: string;
    userId?: string;
    userName?: string;
    dateCreated: string;
    parentCommentId?: number | null;
    reportId?: number;
}

export interface ReportReaction {
    id: number;
    reactionType: string;
    userId: string;
    dateCreated: string;
}

export interface ReportDTO {
    id: number;
    location?: string;
    description?: string;
    citizenId: string;
    citizenName?: string;
    citizenProfilePicture?: string;
    dateCreated: string;
    photos: ReportPhoto[];
    comments: ReportComment[];
    reactions: ReportReaction[];
}

export interface AdminDashboardDTO {
    reportsCount: number;
    usersCount: number;
    flaggedPostCount: number;
    reviewedFlaggedCount: number;
    weeklyActivitiesCount: number;
}

export interface CreateReportDTO {
    Location?: string;
    Description?: string;
    Photos?: File[];
}

export interface AddCommentDTO {
    UserId?: string;
    Content: string;
    ParentCommentId?: number | null;
}

export interface AddReactionDTO {
    UserId?: string;
    ReactionType: string;
}
export interface Toast {
    message: string;
    type: "success" | "error" | "warning";
    title?: string;
    duration?: number; // in seconds
}
