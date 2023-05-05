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
            const response = await agent.Tenants.list();
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                this.tenants = response.data;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            throw error;
        }
    }

    // create new tenant
    createTenant = async (createTenantRequest: CreateTenantRequest) => {
        this.setLoading(true);

        try {
            const response = await agent.Tenants.create(createTenantRequest);
            if (!response.succeeded) throw new Error(response.messages[0]);
            const newTenant = response.data;
            runInAction(() => {
                this.tenants.push(newTenant); // add to registry list (local memory) - prevents having to reload the table
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            throw error;
        }
    }

    // update tenant
    updateTenant = async (tenant: Tenant) => {
        this.setLoading(true);
        try {
            const response = await agent.Tenants.update(tenant);
            if (!response.succeeded) throw new Error(response.messages[0]);
            runInAction(() => {
                const tenantIndex = this.tenants.findIndex(x => x.id == tenant.id);
                this.tenants[tenantIndex] = tenant;
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            throw error;
        }
    }
}