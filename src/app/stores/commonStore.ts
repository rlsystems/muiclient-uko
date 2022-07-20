import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    tenant: string | null = '';
    hasSubdomain: boolean = false; // set upon application loading
    title: string | null = '';
    darkMode: boolean = true;
    pageSizeDefault: number = 10;
    appLoaded:boolean = false;


    constructor() {
        makeAutoObservable(this); // let MobX auto create interfaces
        
        reaction( // reaction doesnt run when store is initialized, only runs when there is a change to 'token'
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


    setToken = (token: string | null) => {      
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

    setPageSize = (size: number) => {
        runInAction(() => {
            this.pageSizeDefault = size;
        })
    }

    setDarkTheme = (darkModeEnabled: boolean) => {
        runInAction(() => {
            this.darkMode = darkModeEnabled;
        })
    }

    setSubdomain = () => {
        runInAction(() => {
            this.hasSubdomain = true;
        })
    }

}