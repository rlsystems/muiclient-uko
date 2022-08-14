
// Current User (profile)
export interface CurrentUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean; 
    roleId: string;
    imageUrl: string;
    darkModeDefault: boolean;
    pageSizeDefault: number;
    createdOn: string;
}

// Update your profile (includes image upload, excludes role and active)
export interface UpdateProfileRequest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    imageFile?: Blob;
    imageUrl: string;
    deleteCurrentImage: boolean;
}

// Update your preferences
export interface UpdatePreferencesRequest {
    darkModeDefault: boolean;
    pageSizeDefault: number;
}

//Update your password
export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}
