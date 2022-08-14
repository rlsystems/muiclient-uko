// venue - sample business entity
export interface Venue {
  id: string;
  name: string;
  description: string;
}

// create new venue
export interface AddVenueRequest {
  Name: string;
  Description: string;
}