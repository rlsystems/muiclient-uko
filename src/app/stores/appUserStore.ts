import { toast } from "material-react-toastify";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RegisterUserRequest, User } from "../models/user";


export default class AppUserStore {

    appUserRegistry = new Map<string, User>();

    //users: User[] = []; //REMOVE THE REGISTRIES

    loading = false; // this loading is for adding new users, updating and deleting
    loadingInitial = false; // this loading is for the view

    // Let Mobx auto create the interface for this class
    constructor() {
        makeAutoObservable(this)
    }

    // Computed property - returns an array of users sorted by created on date, newest first
    get appUsersSorted() {
        return Array.from(this.appUserRegistry.values()).sort((a, b) => new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf());
    }



    // Helper method
    private setAppUser = (user: User) => {
        runInAction(() => {
            this.appUserRegistry.set(user.id, user);
        })
    }

    // Loading setter
    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    // Loading setter
    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }

    // Loading app users - triggered by visiting user list
    loadAppUsers = async () => { 
        this.setLoadingInitial(true);
        try {
            const result = await agent.Users.list(); // full list from api

            result.data.forEach(user => {
                this.setAppUser(user);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // Register a new user
    createAppUser = async (appUser: RegisterUserRequest): Promise<boolean | undefined> => {
        this.setLoading(true)

        try {
            const response = await agent.Users.create(appUser);
            this.setLoading(false)
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }

            runInAction(() => {
                appUser.id = String(response.data); // the GUID returned from the api
                const createdOnDate = new Date().toUTCString(); // create a UTC date client side (alternatly you could return the new user object instead of just the id)

                const newuser: User = {
                    id: appUser.id,
                    firstName: appUser.firstName,
                    lastName: appUser.lastName,
                    email: appUser.email,
                    phoneNumber: appUser.phoneNumber,
                    roleId: appUser.roleId,
                    imageUrl: "",
                    isActive: true,
                    createdOn: createdOnDate
                }

                this.appUserRegistry.set(appUser.id, newuser); // add to registry list (local memory) - prevents having to reload the table

            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            return false
        }
    }

    // Update an existing user
    updateAppUser = async (user: User): Promise<boolean | undefined> => {
        this.setLoading(true)

        try {
            const response = await agent.Users.update(user);
            this.setLoading(false)
            if (!response.succeeded) { // handle any errors returned from api
                toast.error(response.messages[0]);
                return false
            }
            runInAction(() => {
                this.appUserRegistry.set(user.id, user); // update app user in registry
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            return false
        }
    }

    // Delete user
    deleteAppUser = async (id: string): Promise<boolean | undefined> => {
        this.setLoadingInitial(true)

        try {
            const response = await agent.Users.delete(id); // api call to delete from database
            this.setLoadingInitial(false)
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            runInAction(() => {
                this.appUserRegistry.delete(id); // delete from registry (local)
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
            return false
        }
    }
}