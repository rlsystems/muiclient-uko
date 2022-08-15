// venue - sample business entity
export interface Venue {
  id: string;
  name: string;
  description: string;
  createdOn: string;
}

// create new venue
export interface AddVenueRequest {
  Name: string;
  Description: string;
}