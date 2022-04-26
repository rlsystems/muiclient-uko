export interface Venue {
    id: string;
    name: string;
    description: string;
    type: 0 | 1;
  }

export interface AddVenueRequest {
    Name: string;
    Description: string;
    Type: 0 | 1;
  }