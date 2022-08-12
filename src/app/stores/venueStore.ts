import {  makeAutoObservable, runInAction } from "mobx";
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

    setVenueMetaData = (metaData: Omit<PaginatedResult<Venue>, 'data'>) => {
        runInAction(() => {
            this.venueMetaData = metaData;
        })
    }
    //---------------------------------

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
            const {data, ...metaData} = await agent.Venues.search(params); //get list of venues
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


    deleteVenue = async (id: string) => {
        this.setLoadingInitial(true)

        try {
            await agent.Venues.delete(id); // delete from database
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
        }
    }
}