import { v4 } from "uuid";

export type Event = {
  // TO_DO: refactor!!!
  _id: typeof v4 | null;
  emoji: string | undefined;
  // TO_DO: refactor!!!
  startTime: Date | any;
  finishTime: Date | any;
  title: string;
  notes: string;
  isPinned: boolean;
};

export type DayEvents = {
  [time: string]: Event;
};

export type AllEvents = {
  [date: string]: DayEvents;
};
