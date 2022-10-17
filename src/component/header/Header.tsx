import { useEvents } from "../../context/EventsContext";
import unitedKindomFlat from "../../images/united-kingdom.png";
import "./header.css";

const Header = () => {
  const { events, error, loading } = useEvents();
  const startDate =
    events && new Date(Object.keys(events)[0]).toLocaleDateString("de");
  const endDate =
    events &&
    new Date(
      Object.keys(events)[Object.keys(events).length - 1]
    ).toLocaleDateString("de");

  return (
    <header>
      <div className="location">
        <div className="location__title">
          <img
            src={unitedKindomFlat}
            alt="united kindom"
            width={20}
            height={20}
          />
          London
        </div>
        {events && !error && !loading && (
          <div className="location__dates-range">
            {startDate} - {endDate}
          </div>
        )}
      </div>
      <h2>Public Events</h2>
    </header>
  );
};

export default Header;
