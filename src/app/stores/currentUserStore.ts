import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ChangePasswordRequest, UpdatePreferencesRequest, UpdateProfileRequest, CurrentUser } from "../models/currentUser";
import { UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';
import { store } from "./store";
import { history } from '../..';

// current user - edit profile, update preferences, change password, etc
export default class CurrentUserStore {
    currentUser: CurrentUser | null = null;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.currentUser, (currentUser) => { // triggered when there is a change to currentUser
            if(currentUser) {
                store.commonStore.setPageSize(currentUser.pageSizeDefault);
                store.commonStore.setDarkTheme(currentUser.darkModeDefault);
            }
        });
    }

    // helper method, check if logged in
    get isLoggedIn() {
        return !!this.currentUser;
    }

    // loading setter (initial page load)
    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    // login - get token, then set current user and push to venues view 
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

    // set all local variables to blank, remove token, push user to login url
    logout = () => {
        store.commonStore.setToken(null); 
        store.appUserStore.users = [];
        store.tenantStore.tenants = [];
        window.localStorage.removeItem('jwt');
        this.currentUser = null;
        history.push('/');
    };

    // get current user from api
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

    // update current user 
    updateCurrentUser = async (user: UpdateProfileRequest) => {
        runInAction(() => {
            store.appUserStore.loading = true;
        })
        try {
            let updatedUser = await agent.Account.updateProfile(user);
            runInAction(() => {
                const userIndex = store.appUserStore.users.findIndex(x => x.id == user.id);
                store.appUserStore.users[userIndex] = updatedUser.data; // also update the users array

                this.currentUser = updatedUser.data;
                store.appUserStore.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                store.appUserStore.loading = false;
            })
        }
    }

    // update preferences (page size, dark mode default)
    updatePreferences = async (updatePreferencesRequest: UpdatePreferencesRequest) => {
        try {
            const response = await agent.Account.updatePreferences(updatePreferencesRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    // change password
    changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
        try {
            const response = await agent.Account.changePassword(changePasswordRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    // forgot password
    forgotPassword = async (forgotPasswordRequest: ForgotPasswordRequest) => {
        store.commonStore.setTenant(forgotPasswordRequest.tenant);
        try {
            const response = await agent.Account.forgotPassword(forgotPasswordRequest);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    // reset password
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