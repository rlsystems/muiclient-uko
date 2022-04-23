import { SearchParams } from "app/models/searchParams";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RegisterUserRequest, User } from "../models/user";


export default class AppUserStore {

    appUserRegistry = new Map<string, User>();
    selectedAppUser: User | undefined = undefined;

    editMode: boolean = false;
    createAppUserLoading: boolean = false; //could we use local state for these instead?
    updateAppUserLoading: boolean = false; 
    deleteAppUserLoading: boolean = false; 

    loadingInitial: boolean = false; //for page loads
    

    constructor() {
        makeAutoObservable(this) //Let Mobx auto create the interface for this class
    }


    
    loadAppUsers = async () => { //triggered by dashboard load
        this.setLoadingInitial(true);
        try {


            const result = await agent.Users.list(); //get list of app users
            
            result.data.forEach(user => {
                this.setAppUser(user);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAppUser = async (id: string) => {
        
        let appUser = this.getAppUser(id);
        if(appUser) { //if already in memory (registry)
            this.selectedAppUser = appUser;         
            return appUser;
        } 
        else { //if reloading page (no memory/registry)
            this.loadingInitial = true;
            try {
                const result = await agent.Users.details(id);
                
                this.selectedAppUser = result.data;
                this.setLoadingInitial(false);
                return result.data;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }



    //computed Property
    get appUsersSorted() {
        return Array.from(this.appUserRegistry.values());
    }

    //helper methods -----------------
    public getAppUser = (id: string) => {
        return this.appUserRegistry.get(id);
    }

    private setAppUser = (user: User) => { 
        this.appUserRegistry.set(user.id, user);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    //---------------------------------

    //register a new user
    createAppUser = async (appUser: RegisterUserRequest) => {
        this.createAppUserLoading = true;

        try {
            let response = await agent.Users.create(appUser);
            runInAction(() => {
                appUser.id = String(response.data); //The GUID

                var newuser: User = {
                    id: appUser.id,
                    firstName: appUser.firstName,
                    lastName: appUser.lastName,
                    email: appUser.email,
                    phoneNumber: appUser.phoneNumber,
                    roleId: appUser.roleId,
                    imageUrl: "",
                    isActive: true
                }
                
                this.appUserRegistry.set(appUser.id, newuser); //add to memory list

                this.selectedAppUser = newuser;
                this.editMode = false;
                this.createAppUserLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.createAppUserLoading = false;
            })
        }
    }
    


    updateAppUser = async (user: User) => {
        this.updateAppUserLoading = true;

        try {
            await agent.Users.update(user);
            runInAction(() => {
                this.appUserRegistry.set(user.id, user); //Map Object set will update if ID same
                this.editMode = false;
                this.updateAppUserLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.updateAppUserLoading = false;
            })
        }
    }

    deleteAppUser = async (id: string) => {
        this.deleteAppUserLoading = true;

        try {
            await agent.Users.delete(id); //delete from DB
            runInAction(() => {
                this.appUserRegistry.delete(id); //delete from local memory
                this.deleteAppUserLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.deleteAppUserLoading = false;
            })
        }
    }




}