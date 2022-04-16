import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    tenant: string | null = '';
    hasSubdomain: boolean = false; //set upon application loading
    title: string | null = '';
    darkMode = true;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction( //Reaction -- > doesnt run when store is initialized, only runs when there is a change to 'token'
            () => this.token,
            token => {
                if(token){
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        runInAction(() => {
            this.error = error;
        })
    }



    setToken = (token: string | null) => {
        //if(token) window.localStorage.setItem('jwt', token); //set to browser local storage --> now taken care of by the reaction
        runInAction(() => {
            this.token = token;
        })
    }

    setTenant = (tenant: string | null) => {
        runInAction(() => {
            this.tenant = tenant;
        })
    }

    setTitle = (title: string | null) => {
        runInAction(() => {
            this.title = title;
        })
    }

    setAppLoaded = () => {
        runInAction(() => {
            this.appLoaded = true;
        })
    }

    setDarkMode = () => {
        runInAction(() => {
            this.darkMode == false ? this.darkMode = true : this.darkMode = false;
        })
    }

    setSubdomain = () => {
        runInAction(() => {
            this.hasSubdomain = true;
        })
    }

}