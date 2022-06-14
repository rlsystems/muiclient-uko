export enum RoleID  {
    basic = "basic",
    editor = "editor",
    admin = "admin",
    root = "root"
}


//Profile 
export interface CurrentUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean; //remove
    roleId: string;
    imageUrl: string;
    darkModeDefault: boolean;
    pageSizeDefault: number;
}

//AppUser share this class
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    roleId: string;
    imageUrl: string;
}

//Admin Create New User
export interface RegisterUserRequest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    roleId: string;
}

//Update your own profile (includes image upload, excludes role and active)
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

//Update your own preferences
export interface UpdatePreferencesRequest {
    darkModeDefault: boolean;
    pageSizeDefault: number;
}

//Update your own password
export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

