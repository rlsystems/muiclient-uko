import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CreateTenantRequest, Tenant } from "../models/tenant";


export default class TenantStore {

    tenantRegistry = new Map<string, Tenant>();
    selectedTenant: Tenant | undefined = undefined;

    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false; 


    constructor() {
        makeAutoObservable(this) 
    }


    loadTenants = async () => {
        this.setLoadingInitial(true);
        try {

            console.log('loading tenants');
            const result = await agent.Tenants.list(); 
            result.data.forEach(tenant => {
                this.setTenant(tenant);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
        }
    }

    loadTenant = async (id: string) => {
        let tenant = this.getTenant(id);
        if(tenant) {
            this.selectedTenant = tenant;
            return tenant;
        } 
        else {
            this.loadingInitial = true;
            try {
                const result = await agent.Tenants.details(id);
                this.selectedTenant = result.data;
                this.setLoadingInitial(false);
                return result.data;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

   

    // computed Property
    get tenantsSorted() {
        return Array.from(this.tenantRegistry.values());
    }

    // helper methods -----------------
    private getTenant = (id: string) => {
        return this.tenantRegistry.get(id);
    }

    private setTenant = (tenant: Tenant) => { //add to registry 
        this.tenantRegistry.set(tenant.id, tenant);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    //---------------------------------


    
    createTenant = async (createTenantRequest: CreateTenantRequest) => {
        this.loading = true;

        try {
            let response = await agent.Tenants.create(createTenantRequest);
            runInAction(() => {

                if(response.succeeded){

                    var newtenant: Tenant = {
                        id: response.data.id,
                        name: response.data.name,
                        isActive: true,
                    }

                    this.tenantRegistry.set(newtenant.id, newtenant); 
                    this.selectedTenant = newtenant;

                }
                          
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


    updateTenant = async (tenant: Tenant) => {
        this.loading = true;

        try {
            let response = await agent.Tenants.update(tenant);
            
            runInAction(() => {
     
                if(response.succeeded){

                    var updatedTenant: Tenant = {
                        id: tenant.id,
                        name: tenant.name,
                        isActive: tenant.isActive,
                    }

                    this.tenantRegistry.set(updatedTenant.id, updatedTenant); 
                    this.selectedTenant = updatedTenant;

                }
                          
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

   

}