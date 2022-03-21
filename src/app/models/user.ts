export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
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



//for login
export interface UserLogin {
    email: string;
    password: string;
    tenant: string;
}


export interface TokenData {
    token: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;

}