import { action, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Venue } from "../models/venue";
import { SearchParams } from "../models/searchParams";
import { PaginatedResult } from '../models/responseWrappers';
import usePaginationMetaData, { TOTAL_PAGE_COUNT_CHANGED } from "app/hooks/usePaginationMetaData";
import commonStore from "./commonStore";
import { store } from "./store";

export default class VenueStore {

    venueRegistry = new Map<string, Venue>();
    venues: Venue[] = [];
    venueMetaData: Omit<PaginatedResult<Venue>, 'data'> | null = null;
    selectedVenue: Venue | undefined = undefined;

    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;
    createUpdateLoading: boolean = false;
    


    constructor() {
        makeAutoObservable(this) 
    }


    loadVenues = async (
        pageNumber: number = 1,
        pageSize: number = 5,
        keyword: string = ''
    ) => {
        this.setLoadingInitial(true);
        try {
            const params: SearchParams = {
                pageNumber,
                pageSize,
                keyword
            }
            const {data, ...metaData} = await agent.Venues.search(params); //get list of venues
            runInAction(() => {
                this.venues = data;
            })
            data.forEach(venue => {
                this.setVenue(venue);
            })
            this.setVenueMetaData(metaData);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadVenue = async (id: string) => {
        let venue = this.getVenue(id);
        if(venue) {
            this.selectedVenue = venue;
            return venue;
        }
        else {
            this.loadingInitial = true;
            try {
                const result = await agent.Venues.details(id);
                this.selectedVenue = result.data;
                this.setLoadingInitial(false);
                return result.data;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    // computed Property
    get venuesSorted() {
        return Array.from(this.venueRegistry.values());
    }

    // helper methods -----------------
    private getVenue = (id: string) => {
        return this.venueRegistry.get(id);
    }

    private setVenue = (venue: Venue) => { // here you can set formatting if necessary
        this.venueRegistry.set(venue.id, venue);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setVenueMetaData = action((metaData: Omit<PaginatedResult<Venue>, 'data'>) => {
        this.venueMetaData = metaData;
    })
    //---------------------------------

    //pass in pagination state to createVenue?
    //--why dont we need to do this for reactTable?
    createVenue = async (venue: Venue) => {
        this.createUpdateLoading = true;

        try {
            const venueRequestBody = {
                Name: venue.name,
                Description: venue.description,
            }
            //const [state, dispatch] = usePaginationMetaData(store.commonStore.pageSizeDefault); <--- this doesnt work 
            let response = await agent.Venues.create(venueRequestBody);
            runInAction(async () => {
                venue.id = String(response.data); 
                this.venueRegistry.set(venue.id, venue);
                
                this.selectedVenue = venue;
                this.editMode = false;
                this.createUpdateLoading = false;
                await this.loadVenues(); //pass pagination state to this?
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.createUpdateLoading = false;
            })
        }
    }

    updateVenue = async (venue: Venue) => {
        this.createUpdateLoading = true;

        try {
            await agent.Venues.update(venue);
            runInAction(async () => {
                this.venueRegistry.set(venue.id, venue); // update object in venue registy
                this.selectedVenue = venue;
                this.editMode = false;
                this.createUpdateLoading = false;
                await this.loadVenues();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.createUpdateLoading = false;
            })
        }
    }


    deleteVenue = async (id: string) => {
        this.loading = true;

        try {
            await agent.Venues.delete(id); // delete from database
            runInAction(async () => {
                this.venueRegistry.delete(id); // delete from local memory
                await this.loadVenues();
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