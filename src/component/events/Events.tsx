import { Event, Tag, useEvents } from "../../context/EventsContext";
import { useNotifications } from "../../context/notifications/NotificationsContext";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import mapPinIcon from "../../images/map-pin.svg";
import { ClipLoader } from "react-spinners";
import "./events.css";

const baseURL = "https://www.google.com/maps/dir";

export const Events = () => {
  const { events, error, loading } = useEvents();

  if (loading) {
    return (
      <div className="main__events_container-loading">
        <ClipLoader
          color={"gray"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        Loading
      </div>
    );
  }

  if (error) {
    return (
      <div className="main__events_container-error">
        Sorry, there was an error. Our team has already been notified.
      </div>
    );
  }

  if (!events) {
    return null;
  }

  if (events && Object.keys(events).length === 0) {
    return <NotFound />;
  }

  return (
    <div className="main__events_container">
      {Object.entries(events).map((event) => (
        <EventsList event={event} key={event[0]} />
      ))}
    </div>
  );
};

const EventsList = ({ event }: { event: [string, Event[]] }) => {
  const { findItemInCart } = useShoppingCart();
  const eventsAlreadyInCart = event[1].every((ev) => findItemInCart(ev._id));

  if (eventsAlreadyInCart) {
    return null;
  }

  return (
    <div key={event[0]} className="events">
      <div className="events__date">{new Date(event[0]).toDateString()}</div>
      <div className="events__group">
        {event[1].map((ev) => {
          if (findItemInCart(ev._id)) {
            return null;
          }
          return <SingleEvent key={ev._id} event={ev} />;
        })}
      </div>
    </div>
  );
};

const NotFound = () => (
  <p className="not-found">
    Ups! We couldn't find what you were looking for{" "}
    <span className="emoji">:(</span>
  </p>
);

const logoStyle: Record<Tag, string> = {
  jazz: "blue",
  festival: "orange",
  party: "pink",
  session: "lightblue",
  rave: "green",
  live: "red",
  event: "black",
};

export const SingleEvent = ({ event }: { event: Event }) => {
  const { addItemToCart } = useShoppingCart();
  const { notify } = useNotifications();
  const handleAddClick = () => {
    addItemToCart(event);
    notify("The event was added to your cart");
  };

  return (
    <div className="event">
      <div className="event__title">
        <div
          className="tags"
          style={{ display: "flex", flexDirection: "column", gap: 5 }}
        >
          {event.tag.map((t) => (
            <SingleTag bgColor={logoStyle[t]} tag={t} key={t} />
          ))}
        </div>
        {event.title}
      </div>
      <div className="event__flyer">
        <img src={event.flyerFront} alt={`${event.title} flyer`} />
      </div>
      <div className="event__footer">
        <a
          href={`${baseURL}//${event.venue.name}+${event.city}+${event.country}`}
          target="_blank"
          className="event_venue"
          rel="noreferrer"
        >
          <img src={mapPinIcon} alt="location" width={16} />
          {event.venue.name}
        </a>
        <div className="event__footer__start">
          Starts: {new Date(event.startTime).toLocaleString("de")}
        </div>
        <div className="event__footer__ends">
          Ends: {new Date(event.endTime).toLocaleString("de")}
        </div>
        <button type="button" className="plus_icon" onClick={handleAddClick}>
          +
        </button>
      </div>
    </div>
  );
};

const SingleTag = ({ tag, bgColor }: { tag: string; bgColor: string }) => {
  return (
    <div
      className="tag"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {tag}
    </div>
  );
};
