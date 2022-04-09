import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ChangePasswordRequest, UpdateProfileRequest, User } from "../models/user";
import { UserLogin, ForgotPasswordRequest, ResetPasswordRequest} from '../models/auth';

import { store } from "./store";
import { history } from '../..';
import { Venue } from "../models/venue";

export default class UserStore {

    //User store is for profile management and current user

    currentUser: User | null = null;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    login = async (creds: UserLogin) => {

        store.commonStore.setTenant(creds.tenant);
        try {
            const response = await agent.Account.login(creds);
            if(!response.succeeded) throw(Error(response.messages[0]))
            store.commonStore.setToken(response.data.token);
            const user = await agent.Account.current();

            runInAction(() => //timing issue with async operations
                this.currentUser = user.data
            );
            history.push('/venues');
            //navigate("/dashboard", { replace: true });
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };


    logout = () => {
        store.commonStore.setToken(null);
        store.venueStore.selectedVenue = undefined; //hack to set blank
        store.venueStore.venueRegistry = new Map<string, Venue>(); //hack to set blank

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
            runInAction(() => //timing issue with async operations
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
                this.currentUser = updatedUser.data; //image will update but fields will not -- why??
                store.appUserStore.updateAppUserLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                store.appUserStore.updateAppUserLoading = false;
            })
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




