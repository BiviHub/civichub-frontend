// No changes needed; included for completeness as per your request
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
    userProfilePicture?: string;
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
    CitizenId?: string;
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

export interface ProfileDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

export interface UserReportDTO {
    UserId: string;
    Location?: string;
    Description?: string;
    DateCreated: string;
    CommentCount: number;
    ReactionCount: number;
}

export interface EditReportDTO {
    Location?: string;
    Description?: string;
}

// Additions for Settings functionality
export interface ChangePasswordDTO {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface NotificationPrefsDTO {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    followedUsers: boolean;
    localPosts: boolean;
    generalActivity: boolean;
}

export interface PrivacySettingsDTO {
    visibility: 'public' | 'private' | 'friends';
}

export interface Update2FADTO {
    enabled: boolean;
}
export interface AnnouncementDTO {
    id?: number;
    title: string;
    content: string;
    dateCreated?: string;
    createdById?: string;
    createdBy?: string;
}