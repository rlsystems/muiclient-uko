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