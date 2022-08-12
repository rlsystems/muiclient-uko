import { toast } from "material-react-toastify";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RegisterUserRequest, User } from "../models/user";


export default class AppUserStore {

    appUserRegistry = new Map<string, User>();

    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this) // Let Mobx auto create the interface for this class
    }

    // computed Property
    get appUsersSorted() {
        // TODO: SORT THE BELOW ARRAY
        return Array.from(this.appUserRegistry.values())
            // .sort((a, b) => a.createdDate - b.createdDate);
            // .sort((a, b) => b.createdDate - a.createdDate);
    }

    // helper methods -----------------
    public getAppUser = (id: string) => {
        return this.appUserRegistry.get(id);
    }

    private setAppUser = (user: User) => {
        runInAction(() => {
            this.appUserRegistry.set(user.id, user);
        })
    }

    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }

    loadAppUsers = async () => { // triggered by visiting user management view
        this.setLoadingInitial(true);
        try {
            const result = await agent.Users.list(); // get list of app users

            result.data.forEach(user => {
                this.setAppUser(user);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    //---------------------------------

    // register a new user
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
                appUser.id = String(response.data); // the GUID

                const newuser: User = {
                    id: appUser.id,
                    firstName: appUser.firstName,
                    lastName: appUser.lastName,
                    email: appUser.email,
                    phoneNumber: appUser.phoneNumber,
                    roleId: appUser.roleId,
                    imageUrl: "",
                    isActive: true
                }

                this.appUserRegistry.set(appUser.id, newuser); // add to registry list (local memory)

            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            return false
        }
    }

    updateAppUser = async (user: User): Promise<boolean | undefined> => {
        this.setLoading(true)

        try {
            const response = await agent.Users.update(user);
            this.setLoading(false)
            if (!response.succeeded) {
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

    deleteAppUser = async (id: string): Promise<boolean | undefined> => {
        this.setLoadingInitial(true)

        try {
            const response = await agent.Users.delete(id); // delete from database
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