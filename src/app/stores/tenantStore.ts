import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "material-react-toastify";
import agent from "../api/agent";
import { CreateTenantRequest, Tenant } from "../models/tenant";


export default class TenantStore {

    tenantRegistry = new Map<string, Tenant>();
    selectedTenant: Tenant | undefined = undefined;

    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }

    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    get tenantsSorted() {
        return Array.from(this.tenantRegistry.values());
    }

    private setTenant = (tenant: Tenant) => { //add to registry
        this.tenantRegistry.set(tenant.id, tenant);
    }

    loadTenants = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Tenants.list();
            result.data.forEach(tenant => {
                this.setTenant(tenant);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
        }
    }

    createTenant = async (createTenantRequest: CreateTenantRequest): Promise<boolean | undefined> => {
        this.setLoading(true);

        try {
            const response = await agent.Tenants.create(createTenantRequest);
            this.setLoading(false);
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }

            const newtenant: Tenant = {
                id: createTenantRequest.id,
                name: createTenantRequest.name,
                isActive: true,
            }
            runInAction(() => {
                this.tenantRegistry.set(newtenant.id, newtenant);
                this.selectedTenant = newtenant;
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            return false
        }
    }


    updateTenant = async (tenant: Tenant): Promise<boolean | undefined> => {
        this.setLoading(true);

        try {
            const response = await agent.Tenants.update(tenant);
            this.setLoading(false);
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            const updatedTenant: Tenant = {
                id: tenant.id,
                name: tenant.name,
                isActive: tenant.isActive,
            }

            runInAction(() => {
                this.tenantRegistry.set(updatedTenant.id, updatedTenant);
                this.selectedTenant = updatedTenant;
            })
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            return false
        }
    }
}