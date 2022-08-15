import { toast } from "material-react-toastify";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { RegisterUserRequest, User } from "../models/user";


export default class AppUserStore {
    users: User[] = []; 

    loading = false; // this loading is for adding new users, updating and deleting
    loadingInitial = false; // this loading is for the view

    // Let Mobx auto create the interface for this class
    constructor() {
        makeAutoObservable(this)
    }

    // Computed property - returns an array of users sorted by created on date, newest first
    get appUsersSorted() {
        return Array.from(this.users.values()).sort((a, b) => new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf());
    }

    // Loading setter (initial page load)
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

    // Load app users - triggered by visiting user list
    loadAppUsers = async () => { 
        this.setLoadingInitial(true);
        try {
            const result = await agent.Users.list(); // full list from api
            runInAction(() => {
                this.users = result.data;
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
                const newAppUser = response.data; // the user returned from the api
                this.users.push(newAppUser); // add to registry list (local memory) - prevents having to reload the table
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
                const userIndex = this.users.findIndex(x => x.id == user.id); // find index of user and update 
                this.users[userIndex] = user;
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
                const userIndex = this.users.findIndex(x => x.id == id); // find index of user and update 
                this.users.splice(userIndex, 1)
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
            return false
        }
    }
}