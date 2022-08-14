import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Venue } from "../models/venue";
import { SearchParams } from "../models/searchParams";
import { PaginatedResult } from '../models/responseWrappers';
import { toast } from "material-react-toastify";

export default class VenueStore {
    venues: Venue[] = [];
    venueMetaData: Omit<PaginatedResult<Venue>, 'data'> | null = null;

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
    // set pagination meta data
    setVenueMetaData = (metaData: Omit<PaginatedResult<Venue>, 'data'>) => {
        runInAction(() => {
            this.venueMetaData = metaData;
        })
    }

    // load venues - full list of venues from api
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
    createVenue = async (
        venue: Venue
    ): Promise<boolean | undefined> => {
        this.setLoading(true)

        try {
            const venueRequestBody = {
                Name: venue.name,
                Description: venue.description,
            }
            const response = await agent.Venues.create(venueRequestBody);
            this.setLoading(false)
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            return false
        }
    }

    // update venue
    updateVenue = async (
        venue: Venue
    ): Promise<boolean | undefined> => {
        this.setLoading(true)

        try {
            const response = await agent.Venues.update(venue);
            this.setLoading(false)
            if (!response.succeeded) {
                toast.error(response.messages[0]);
                return false
            }
            return true
        } catch (error) {
            console.log(error);
            this.setLoading(false)
            return false
        }
    }

    // delete venue
    deleteVenue = async (id: string) => {
        this.setLoadingInitial(true)

        try {
            await agent.Venues.delete(id); 
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
        }
    }
}