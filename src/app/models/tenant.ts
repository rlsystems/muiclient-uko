// Tenant
export interface Tenant {
    id: string;
    name: string;
    isActive: boolean;
}

// Create Tenant
export interface CreateTenantRequest {
    id: string;
    name: string;
    adminEmail: string;
    password: string;
}

