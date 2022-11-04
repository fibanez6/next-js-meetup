export interface Meetups {
  meetups: Meetup[]
}

export interface MeetupFormData {
  image: string;
  title: string;
  address: string;
  description: string;
}

export type Meetup = { id: string } & MeetupFormData;

export type MeetupDoc = { _id: object } & MeetupFormData;
