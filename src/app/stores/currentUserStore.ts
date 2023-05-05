import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ChangePasswordRequest, UpdatePreferencesRequest, UpdateProfileRequest, CurrentUser, ChangeProfileImageRequest } from "../models/currentUser";
import { UserLogin, ForgotPasswordRequest, ResetPasswordRequest } from '../models/auth';
import { store } from "./store";
import router from "router";

// current user - edit profile, update preferences, change password, etc
export default class CurrentUserStore {
    currentUser: CurrentUser | null = null;

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.currentUser, (currentUser) => { // triggered when there is a change to currentUser
            if (currentUser) {
                store.commonStore.setPageSize(currentUser.pageSizeDefault);
                store.commonStore.setDarkTheme(currentUser.darkModeDefault);
            }
        });
    }

    // check if logged in
    get isLoggedIn() {
        return !!this.currentUser; // shorthand cast to boolean
    }

    // login - get token, then set current user and push to venues view
    login = async (creds: UserLogin) => {
        store.commonStore.setTenant(creds.tenant);
        try {
            const response = await agent.Account.login(creds);
            if (!response.succeeded) throw new Error(response.messages[0]);
            store.commonStore.setToken(response.data.token);
            const user = await agent.Account.current();
            runInAction(() =>
                this.currentUser = user.data
            );
            router.navigate('/venues');
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    // set all local variables to blank, remove token, push user to login url
    logout = () => {
        store.commonStore.setToken(null);
        store.appUserStore.users = [];
        store.tenantStore.tenants = [];
        window.localStorage.removeItem('jwt');
        this.currentUser = null;
        router.navigate('/');
    };

    // get current user from api
    getCurrentUser = async () => {
        try {
            const response = await agent.Account.current();
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() =>
                this.currentUser = response.data
            );
            return this.currentUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    updateProfileImage = async (changeProfileImageRequest: ChangeProfileImageRequest) => {
        try {
            const response = await agent.Account.changeProfileImage(changeProfileImageRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                if (this.currentUser) this.currentUser.imageUrl = response.data;
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // update current user
    updateCurrentUser = async (user: UpdateProfileRequest) => {
        try {
            const response = await agent.Account.updateProfile(user);
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                this.currentUser = response.data;
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // update preferences (page size, dark mode default)
    updatePreferences = async (updatePreferencesRequest: UpdatePreferencesRequest) => {
        try {
            const response = await agent.Account.updatePreferences(updatePreferencesRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // change password
    changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
        try {
            const response = await agent.Account.changePassword(changePasswordRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // forgot password
    forgotPassword = async (forgotPasswordRequest: ForgotPasswordRequest) => {
        store.commonStore.setTenant(forgotPasswordRequest.tenant);
        try {
            const response = await agent.Account.forgotPassword(forgotPasswordRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // reset password
    resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
        store.commonStore.setTenant(resetPasswordRequest.tenant);
        try {
            const response = await agent.Account.resetPassword(resetPasswordRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}