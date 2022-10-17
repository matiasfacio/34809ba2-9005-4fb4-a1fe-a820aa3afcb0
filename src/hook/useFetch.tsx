import { useEffect, useState } from "react";
import { Event } from "../context/EventsContext";

const fetchEvents = async (countryCode: string, city: string) =>
  await fetch(
    `https://tlv-events-app.herokuapp.com/events/${countryCode}/${city}`
  );

export const useFetch = (countryCode: string, city: string) => {
  const [data, setData] = useState<Event[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const res = await fetchEvents(countryCode, city);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchApi();
  }, [city, countryCode]);

  return { data, error, loading };
};
