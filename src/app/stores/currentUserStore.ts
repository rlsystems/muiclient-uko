import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../models/user";
import { ChangePasswordRequest, UpdatePreferencesRequest, UpdateProfileRequest, CurrentUser } from "../models/currentUser";
import { UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';
import { store } from "./store";
import { history } from '../..';
import { Venue } from "../models/venue";
import { Tenant } from "app/models/tenant";


// operations for current user - edit profile, update preferences
export default class CurrentUserStore { 
    currentUser: CurrentUser | null = null;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.currentUser, (currentUser) => { // triggered when there is a change to currentUser
            if(currentUser) {
                store.commonStore.setPageSize(currentUser.pageSizeDefault);
                store.commonStore.setDarkTheme(currentUser.darkModeDefault);
            }      
        });
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    login = async (creds: UserLogin) => {
        store.commonStore.setTenant(creds.tenant);
        try {
            const response = await agent.Account.login(creds);
            if(!response.succeeded) throw new Error(response.messages[0]);

            store.commonStore.setToken(response.data.token); 
            const user = await agent.Account.current();
            runInAction(() => 
                this.currentUser = user.data          
            );
            history.push('/venues');
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null); // set all local variables to blank, remove token, etc
        store.venueStore.selectedVenue = undefined; 
        store.venueStore.venueRegistry = new Map<string, Venue>(); 

        store.appUserStore.selectedAppUser = undefined; 
        store.appUserStore.appUserRegistry = new Map<string, User>(); 

        store.tenantStore.selectedTenant = undefined; 
        store.tenantStore.tenantRegistry = new Map<string, Tenant>(); 

        window.localStorage.removeItem('jwt');
        this.currentUser = null;
        history.push('/');
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    getCurrentUser = async () => {
        try {
            const result = await agent.Account.current();
            
            runInAction(() => 
                this.currentUser = result.data          
            );
            return this.currentUser;

        } catch (error) {
            console.log(error);
        }
    }

    updateCurrentUser = async (user: UpdateProfileRequest) => {
        store.appUserStore.updateAppUserLoading = true;
        try {
            let updatedUser = await agent.Account.updateProfile(user);
            runInAction(() => {
                store.appUserStore.appUserRegistry.set(user.id, updatedUser.data);
                this.currentUser = updatedUser.data;
                store.appUserStore.updateAppUserLoading = false;
            })
        } catch (error) {
            runInAction(() => {
                store.appUserStore.updateAppUserLoading = false;
            })
        }
    }

    updatePreferences = async (updatePreferencesRequest: UpdatePreferencesRequest) => {
        try {
            const response = await agent.Account.updatePreferences(updatePreferencesRequest);

            return response
        } catch (error) {
            console.log(error);
        }
    }

    changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
        try {
            const response = await agent.Account.changePassword(changePasswordRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    forgotPassword = async (forgotPasswordRequest: ForgotPasswordRequest) => {
        store.commonStore.setTenant(forgotPasswordRequest.tenant);
        try {
            const response = await agent.Account.forgotPassword(forgotPasswordRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
        store.commonStore.setTenant(resetPasswordRequest.tenant);
        try {
            const response = await agent.Account.resetPassword(resetPasswordRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

}




