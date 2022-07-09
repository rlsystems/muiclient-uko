import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ChangePasswordRequest, UpdatePreferencesRequest, UpdateProfileRequest, CurrentUser, User } from "../models/user";
import { UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';

import { store } from "./store";
import { history } from '../..';
import { Venue } from "../models/venue";
import { Tenant } from "app/models/tenant";



export default class CurrentUserStore { 

    //-- contains current user, edit user profile, and update preferences

    currentUser: CurrentUser | null = null;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.currentUser, (currentUser) => {
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

            runInAction(() => //timing issue with async operations
                this.currentUser = user.data          
            );
            store.commonStore.darkMode = user.data.darkModeDefault;
            store.commonStore.pageSizeDefault = user.data.pageSizeDefault;

            history.push('/venues');

        } catch (error) {
            throw error;
        }
    };


    logout = () => {
        store.commonStore.setToken(null);
        store.venueStore.selectedVenue = undefined; // set blank
        store.venueStore.venueRegistry = new Map<string, Venue>(); // set blank

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

            //this will trigger the reactions

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
            console.log(error);
            runInAction(() => {
                store.appUserStore.updateAppUserLoading = false;
            })
        }
    }

    updatePreferences = async (updatePreferencesRequest: UpdatePreferencesRequest) => {
        try {
            const response = await agent.Account.updatePreferences(updatePreferencesRequest);

            store.commonStore.darkMode = updatePreferencesRequest.darkModeDefault; //this works
            store.commonStore.pageSizeDefault = updatePreferencesRequest.pageSizeDefault; //this doesnt

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




