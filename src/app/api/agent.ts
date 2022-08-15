import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'material-react-toastify';
import { store } from '../stores/store';
import { TokenData, UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';
import { User, RegisterUserRequest} from '../models/user';
import { ChangePasswordRequest, UpdateProfileRequest, UpdatePreferencesRequest, CurrentUser } from '../models/currentUser';
import { SearchParams } from '../models/searchParams';
import { PaginatedResult, Result } from '../models/responseWrappers';
import { CreateTenantRequest, Tenant } from '../models/tenant';
import { AddVenueRequest, Venue } from '../models/venue';
import sleep from 'app/utils/sleep';

// Base URL: https://localhost:7250/api for dev, or your production api url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Send up the token with every request, when there is a token
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;

    config.headers = {
        Tenant: store.commonStore.tenant ?? '',
    };

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config;
})

// Axios reponse interceptors
axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000); // Artifical delay for development
    return response;
}, (error: AxiosError) => { // Basic error handling for 400 and 500 type errors
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('Error code 400: bad request');
            break;
        case 401:
            toast.error('Error code 401: unauthorized');
            store.currentUserStore.logout();
            break;
        case 500:
            toast.error('Error code 500: internal server error');
            console.log(data);
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Axios Base
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}, options?: {}) => axios.put<T>(url, body, options).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Auth / Profile Management (Current User)
const Account = {
    current: () => requests.get<Result<CurrentUser>>('/identity/profile'),
    login: (user: UserLogin) => requests.post<Result<TokenData>>(`/tokens`, user),
    update: (user: UpdateProfileRequest) => requests.put<Result<CurrentUser>>(`/identity/profile`, user),

    updateProfile: (user: UpdateProfileRequest) => {
        let formData = new FormData(); // Form data so that we can include the image file

        Object.entries(user).forEach( ([key, val]) => {
            formData.append(key, val);
        })

        return requests.put<Result<CurrentUser>>('/identity/profile', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })

    },
    updatePreferences: (updatePreferencesRequest: UpdatePreferencesRequest) => requests.put<Result>(`/identity/preferences`, updatePreferencesRequest),
    changePassword: (changePasswordRequest: ChangePasswordRequest) => requests.put<Result>(`/identity/change-password`, changePasswordRequest),
    forgotPassword: (forgotPasswordRequest: ForgotPasswordRequest) => requests.post<Result>(`/identity/forgot-password`, forgotPasswordRequest),
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => requests.post<Result>(`/identity/reset-password`, resetPasswordRequest),
}

// Venues (sample business entity)
const Venues = {
    search: (params: SearchParams) => requests.post<PaginatedResult<Venue>>(`/venues/VenueListPaginated`, params), //server-side pagination
    create: (venue: AddVenueRequest) => requests.post<Result<Venue>>('/venues', venue),
    details: (id: string) => requests.get<Result<Venue>>(`/venues/${id}`),
    update: (venue: Venue) => requests.put<Result<Venue>>(`/venues/${venue.id}`, venue),
    delete: (id: string) => requests.del<Result<string>>(`/venues/${id}`),
}

// App User Management
const Users = {
    list: () => requests.get<Result<User[]>>('/identity/'), // full list for client-side pagination
    create: (appUser: RegisterUserRequest) => requests.post<Result<User>>(`/identity/register`, appUser),
    details: (id: string) => requests.get<Result<User>>(`/identity/user/${id}`),
    update: (user: User) => requests.put<Result<User>>(`/identity/user/${user.id}`, user),
    delete: (id: string) => requests.del<Result<string>>(`/identity/user/${id}`),
}

// Tenant Management
const Tenants = {
    list: () => requests.get<Result<Tenant[]>>('/tenants'), // full list for client-side pagination
    details: (id: string) => requests.get<Result<Tenant>>(`/tenants/${id}`),
    create: (tenant: CreateTenantRequest) => requests.post<Result<Tenant>>(`/tenants`, tenant),
    update: (tenant: Tenant) => requests.put<Result<Tenant>>(`/tenants/`, tenant), 
}

const agent = {
    Account,
    Users,
    Tenants,
    Venues
}

export default agent;