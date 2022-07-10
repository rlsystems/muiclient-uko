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

