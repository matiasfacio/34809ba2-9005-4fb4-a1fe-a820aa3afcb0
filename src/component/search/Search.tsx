import React from "react";
import { useEvents } from "../../context/EventsContext";
import "./search.css";

export const Search = () => {
  const { searchByTitle } = useEvents();
  return (
    <div className="search_container">
      <input
        placeholder="Search..."
        id="search_input"
        onChange={(e) => searchByTitle(e.target.value.toLowerCase())}
        onFocus={() => {}}
      />
    </div>
  );
};
