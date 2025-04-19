import { useState } from "react";

function FilterBar({ onFilter }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={handleInput}
      />
    </div>
  );
}

export default FilterBar;