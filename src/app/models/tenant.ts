export interface Tenant {
    id: string;
    name: string;
    isActive: boolean;
}


export interface CreateTenantRequest {
    id: string;
    name: string;
    adminEmail: string;
    password: string;
}

// export interface UpdateTenantRequest {
//     id: string;
//     isActive: boolean;
//     name: string;
// }



// export interface RegisterTenantFormValues {
//     id: string;
//     name: string;
//     key: string;
//     adminEmail: string;
//     connectionString: string;
// }