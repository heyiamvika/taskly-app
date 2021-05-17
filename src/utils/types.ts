export type Event = {
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
