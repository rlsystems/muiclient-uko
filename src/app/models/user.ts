export enum RoleID  {
    basic = "basic",
    editor = "editor",
    admin = "admin",
    root = "root"
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    roleId: string;
}

export interface RegisterUserFormValues {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    roleId: string;
}

export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
    tenant: string; //in production, would come from domain
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
    tenant: string; //in production, would come from domain
}


//for login
export interface UserLogin {
    email: string;
    password: string;
    tenant: string; //in production, would come from domain
}


export interface TokenData {
    token: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;

}