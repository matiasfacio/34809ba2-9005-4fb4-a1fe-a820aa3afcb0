import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "../hook/useFetch";
import {
  sortEventsByDate,
  groupByDate,
  addTag,
  sortEventsByTag,
} from "../utils/helpers";

export type Tag =
  | "jazz"
  | "festival"
  | "party"
  | "session"
  | "rave"
  | "live"
  | "event";

export interface Event {
  _id: number;
  title: string;
  attending: number;
  city: string;
  contentUrl: string;
  country: string;
  date: string;
  flyerFront: string;
  startTime: string;
  endTime: string;
  venue: { direction: string; name: string; id: number; live: boolean };
  tag: Tag[];
}

interface EventsContextProps {
  events: Record<string, Event[]> | undefined;
  sortedEvents: Record<string, Event[]> | undefined;
  searchByTitle: (arg: string) => void;
  error: boolean;
  loading: boolean;
  sortByTag: (arg: Tag) => void;
  clearFilters: () => void;
}

const EventsContext = createContext<EventsContextProps>(
  {} as EventsContextProps
);

export const EventsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [query, setQuery] = useState("");
  const { data: events, error, loading } = useFetch("uk", "london");
  const [eventsState, setEventsState] = useState<Record<string, Event[]>>();
  const [sortedEvents, setSortedEvents] = useState<Record<string, Event[]>>();

  useEffect(() => {
    const sortedEventsByDate = sortEventsByDate(
      (events ?? []).filter((e) => e.title.toLowerCase().includes(query))
    );

    const readyEvents = sortedEventsByDate && addTag(sortedEventsByDate);

    const groupedByDate = readyEvents && groupByDate(sortedEventsByDate);

    if (groupedByDate) {
      setEventsState(groupedByDate);
      setSortedEvents(groupedByDate);
    }
  }, [events, query]);

  const searchByTitle = (query: string) => {
    setQuery(query);
  };

  const sortByTag = (tag: Tag) => {
    setSortedEvents(sortEventsByTag(eventsState, tag));
  };

  const clearFilters = () => setSortedEvents(eventsState);

  return (
    <EventsContext.Provider
      value={{
        events: eventsState ?? ([] as unknown as Record<string, Event[]>),
        searchByTitle,
        error,
        loading,
        sortByTag,
        sortedEvents,
        clearFilters,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("You have to use this hook within the context");
  }
  return context;
};
