import { toast } from "material-react-toastify";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { RegisterUserRequest, User } from "../models/user";


export default class AppUserStore {
    users: User[] = []; 

    loading = false; // this loading is for adding/editing button
    loadingDelete = false; // this loading is for delete button 
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

   // Loading setter (delete user button)
   setLoadingDelete = (state: boolean) => {
    runInAction(() => {
        this.loadingDelete = state;
    })
}

    // Loading setter
    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }

    // Load app users - triggered by visiting user list view
    loadAppUsers = async () => { 
        this.setLoadingInitial(true);
        try {
            const response = await agent.Users.list(); // full list from api
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                this.users = response.data;
            })
            this.setLoadingInitial(false);
        } catch (error) {        
            console.log(error);
            this.setLoadingInitial(false);
            throw error;
        }
    }

    // Register a new user
    createAppUser = async (appUser: RegisterUserRequest) => {
        this.setLoading(true)
        try {
            const response = await agent.Users.create(appUser);
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                const newAppUser = response.data; // the user returned from the api
                this.users.push(newAppUser); // add to registry list (local memory) - prevents having to reload the table
            })
            this.setLoading(false)
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            throw error;
        }
    }

    // Update an existing user
    updateAppUser = async (user: User) => {
        this.setLoading(true)
        try {
            const response = await agent.Users.update(user);         
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                const userIndex = this.users.findIndex(x => x.id == user.id); // find index of user and update 
                this.users[userIndex] = user;
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            throw error;
        }
    }

    // Delete user
    deleteAppUser = async (id: string) => {
        this.setLoadingDelete(true)
        try {
            const response = await agent.Users.delete(id); // api call to delete from database
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                const userIndex = this.users.findIndex(x => x.id == id); // find index of user and remove 
                this.users.splice(userIndex, 1)
            })
            this.setLoadingDelete(false);
        } catch (error) {
            console.log(error);
            this.setLoadingDelete(false);
            throw error;
        }
    }
}