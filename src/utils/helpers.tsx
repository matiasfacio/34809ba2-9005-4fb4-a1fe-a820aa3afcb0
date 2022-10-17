import { Event, Tag } from "../context/EventsContext";

export function sortEventsByDate(events: Event[]) {
  return [...events].sort((eventA, eventB) => {
    if (new Date(eventA.date) > new Date(eventB.date)) {
      return 1;
    }
    if (new Date(eventA.date) < new Date(eventB.date)) {
      return -1;
    }
    return 0;
  });
}

export function groupByDate(events: Event[]) {
  const eventObject: Record<string, Event[]> = {};
  events.forEach((event) => {
    eventObject[event.date as string] = [
      ...(eventObject[event.date as string] ?? []),
      event,
    ];
  });
  return eventObject;
}

export function searchByTitle(events: Event[], title: string) {
  return events.filter((event) => event.title.includes(title));
}

const tags: Tag[] = ["festival", "jazz", "party", "rave", "session"];

export const addTag = (groupedByDate: Event[]) => {
  if (!groupedByDate) return null;

  let newEvents;

  if (groupedByDate) {
    tags.forEach((t) => {
      newEvents = groupedByDate.map((event) => {
        if (event.title.toLowerCase().includes(t)) {
          event.tag ? event.tag.push(t) : (event.tag = [t]);
        }
        if (event.venue.live && event.tag?.indexOf("live") === -1) {
          event.tag ? event.tag.push("live") : (event.tag = ["live"]);
        }
        return event;
      });
    });
  }

  return newEvents;
};
