type RefOptions = {
	uid?: string;
	year?: number;
	month?: number;
	day?: number;
	eventKey?: string;
};

export const createEventsRef = (refOptions: RefOptions): string => {
	// const { uid, year, month, day, eventKey } = refOptions;
	const slugs = Object.values(refOptions);
	return `/events/${slugs.join('/')}/`;
};

export const createAttendeesRef = (refOptions: RefOptions): string => {
	const baseRef = createEventsRef(refOptions);
	return `${baseRef}/attendees/`;
};
