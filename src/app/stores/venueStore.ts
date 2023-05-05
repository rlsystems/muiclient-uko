import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Venue } from "../models/venue";
import { SearchParams } from "../models/searchParams";
import { PaginatedResult } from '../models/responseWrappers';

export default class VenueStore {
    venues: Venue[] = [];
    venueMetaData: Omit<PaginatedResult<Venue>, 'data'> | null = null;

    loading = false; // modal window buttons loading state
    loadingInitial = false; // list view table loading state

    constructor() {
        makeAutoObservable(this)
    }

    // loading state setter 
    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }
    // loading state setter 
    setLoading = (state: boolean) => {
        runInAction(() => {
            this.loading = state;
        })
    }
    // set pagination meta data
    setVenueMetaData = (metaData: Omit<PaginatedResult<Venue>, 'data'>) => {
        runInAction(() => {
            this.venueMetaData = metaData;
        })
    }

    // load venues - paginated list of venues from api
    loadVenues = async (
        pageNumber: number = 1,
        pageSize: number = 5,
        keyword: string = ''
    ) => {
        this.setLoadingInitial(true)
        try {
            const params: SearchParams = {
                pageNumber,
                pageSize,
                keyword
            }
            const { data, ...metaData } = await agent.Venues.search(params); 
            runInAction(() => {
                this.venues = data;
            })
            this.setVenueMetaData(metaData);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // create venue
    createVenue = async (venue: Venue) => {
        this.setLoading(true)
        try {
            const venueRequestBody = {
                Name: venue.name,
                Description: venue.description,
            }
            const response = await agent.Venues.create(venueRequestBody);
            if (!response.succeeded) throw new Error(response.messages[0]);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            throw error;
        }
    }

    // update venue
    updateVenue = async (venue: Venue) => {
        this.setLoading(true)
        try {
            const response = await agent.Venues.update(venue);
            if (!response.succeeded) throw new Error(response.messages[0]);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            throw error;
        }
    }

    // delete venue
    deleteVenue = async (id: string) => {
        this.setLoadingInitial(true)
        try {
            const response = await agent.Venues.delete(id); 
            if (!response.succeeded) throw new Error(response.messages[0]);
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
            throw error;
        }
    }
}