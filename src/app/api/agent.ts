import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { store } from '../stores/store';
import { User, RegisterUserRequest, ChangePasswordRequest, UpdateProfileRequest, UpdatePreferencesRequest, CurrentUser } from '../models/user';
import { TokenData, UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';

import { SearchParams } from '../models/searchParams';
import { PaginatedResult } from '../models/paginatedResult';
import { Result } from '../models/result';
import { CreateTenantRequest, Tenant } from '../models/tenant';
import { AddVenueRequest, Venue } from '../models/venue';
import sleep from 'app/utils/sleep';
 
//Base URL: https://localhost:7250/api or https://aspnano.azurewebsites.net/api
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => { //Send up the token with every request, when there is a token
    const token = store.commonStore.token;

    config.headers = {
        Tenant: store.commonStore.tenant ?? '',
    };

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000); //Artifical delay for development
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                //history.push('/not-found');
            }
            if (data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }

            break;
        case 401:
            // toast.error('unauthorized');
            store.currentUserStore.logout();
            break;
        case 404:
            //history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            //history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}, options?: {}) => axios.put<T>(url, body, options).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

//Identity (Yourself)
const Account = {
    current: () => requests.get<Result<CurrentUser>>('/identity/profile'),
    login: (user: UserLogin) => requests.post<Result<TokenData>>(`/tokens`, user),
    update: (user: UpdateProfileRequest) => requests.put<Result<CurrentUser>>(`/identity/profile`, user),

    updateProfile: (user: UpdateProfileRequest) => {
        let formData = new FormData();

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

const Venues = {
    search: (params: SearchParams) => requests.post<PaginatedResult<Venue>>(`/venues/VenueListPaginated`, params), //server-side pagination
    create: (venue: AddVenueRequest) => requests.post<Result<String>>('/venues', venue),
    details: (id: string) => requests.get<Result<Venue>>(`/venues/${id}`),
    update: (venue: Venue) => requests.put<void>(`/venues/${venue.id}`, venue),
    delete: (id: string) => requests.del<void>(`/venues/${id}`),
}

//App Users (Admin User Management)
const Users = {
    //list: (params: SearchParams) => requests.post<PaginatedResult<User>>('/identity/userlist', params), // server-side pagination
    list: () => requests.get<Result<User[]>>('/identity/'), // full list for client-side pagination
    create: (appUser: RegisterUserRequest) => requests.post<Result<String>>(`/identity/register`, appUser),
    details: (id: string) => requests.get<Result<User>>(`/identity/user/${id}`),
    update: (user: User) => requests.put<void>(`/identity/user/${user.id}`, user),
    delete: (id: string) => requests.del<void>(`/identity/user/${id}`),
}

//Tenants
const Tenants = {
    list: () => requests.get<Result<Tenant[]>>('/tenants'), // full list for client-side pagination
    details: (id: string) => requests.get<Result<Tenant>>(`/tenants/${id}`),
    create: (tenant: CreateTenantRequest) => requests.post<Result<Tenant>>(`/tenants`, tenant),
    update: (tenant: Tenant) => requests.put<Result<Tenant>>(`/tenants/`, tenant), //include id in body
}

const agent = {
    Account,
    Users,
    Tenants,
    Venues
}

export default agent;