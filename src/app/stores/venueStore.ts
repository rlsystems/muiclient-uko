import { action, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Venue } from "../models/venue";
import { SearchParams } from "../models/searchParams";
import { PaginatedResult } from '../models/paginatedResult';

export default class VenueStore {

    venueRegistry = new Map<string, Venue>();
    venues: Venue[] = [];
    venueMetaData: Omit<PaginatedResult<Venue>, 'data'> | null = null;
    selectedVenue: Venue | undefined = undefined;

    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;
    createVenueLoading: boolean = false;
    updateVenueLoading: boolean = false;


    constructor() {
        makeAutoObservable(this) //Mobx will do the above code by inference
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
            console.log('loading venues');
            const {data, ...metaData} = await agent.Venues.search(params); //get list of venues //QUESTION! - where does ...metaData come from
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
        console.log('load venue')
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


    //computed Property
    get venuesSorted() {
        return Array.from(this.venueRegistry.values());
    }

    //helper methods -----------------
    private getVenue = (id: string) => {
        return this.venueRegistry.get(id);
    }

    private setVenue = (venue: Venue) => { //this handles date formatting (for each object)
        this.venueRegistry.set(venue.id, venue);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setVenueMetaData = action((metaData: Omit<PaginatedResult<Venue>, 'data'>) => {
        this.venueMetaData = metaData;
    })
    //---------------------------------




    createVenue = async (venue: Venue) => {
        this.createVenueLoading = true;

        try {
            const venueRequestBody = {
                Name: venue.name,
                Description: venue.description,
                Type: venue.type
            }
            let response = await agent.Venues.create(venueRequestBody);
            runInAction(async () => {
                venue.id = String(response.data); //The GUID
                this.venueRegistry.set(venue.id, venue); //add an brand to the Map Object

                this.selectedVenue = venue;
                this.editMode = false;
                this.createVenueLoading = false;
                await this.loadVenues();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.createVenueLoading = false;
            })
        }
    }

    updateVenue = async (venue: Venue) => {
        this.updateVenueLoading = true;

        try {
            await agent.Venues.update(venue);
            runInAction(async () => {
                //this.activities = this.activities.filter(a => a.id !== activity.id); //creates a new array excluding the selected one
                //this.activities.push(activity) //add the updated activity in
                this.venueRegistry.set(venue.id, venue); //Map Object set will update if ID same
                this.selectedVenue = venue;
                this.editMode = false;
                this.updateVenueLoading = false;
                await this.loadVenues();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.updateVenueLoading = false;
            })
        }
    }


    deleteVenue = async (id: string) => {
        this.loading = true;

        try {
            await agent.Venues.delete(id); //delete from DB
            runInAction(async () => {
                this.venueRegistry.delete(id); //delete from local memory
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