import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "material-react-toastify";
import agent from "../api/agent";
import { CreateTenantRequest, Tenant } from "../models/tenant";


export default class TenantStore {
    tenants: Tenant[] = [];

    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    // loading setter (initial page load)
    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    // loading setter
    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }

    // return an array sorted by created on date
    get tenantsSorted() {
        return Array.from(this.tenants.values()).sort((a, b) => new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf());
    }

    // load tenants
    loadTenants = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Tenants.list();
            runInAction(() => {
                this.tenants = result.data;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
        }
    }

    // create new tenant
    createTenant = async (createTenantRequest: CreateTenantRequest): Promise<boolean | undefined> => {
        this.setLoading(true);

        try {
            const response = await agent.Tenants.create(createTenantRequest);
            this.setLoading(false);
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            const newTenant = response.data;
            this.tenants.push(newTenant); // add to registry list (local memory) - prevents having to reload the table
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            return false
        }
    }

    // update tenant
    updateTenant = async (tenant: Tenant): Promise<boolean | undefined> => {
        this.setLoading(true);

        try {
            const response = await agent.Tenants.update(tenant);
            this.setLoading(false);
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            runInAction(() => {
                const tenantIndex = this.tenants.findIndex(x => x.id == tenant.id);
                this.tenants[tenantIndex] = tenant;
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            return false
        }
    }
}