import React, { useCallback, useMemo } from "react";
import "./Sort.css";

export default function Sort({ activeSort, onSetActiveSort }) {
  const SORT = useMemo(() => {
    return {
      Old: (a, b) => a.date - b.date,
      New: (a, b) => b.date - a.date,
    };
  }, []);

  const handleActiveSort = (e) => {
    onSetActiveSort(() => SORT[e.target.value]);
  };

  const handleButtonClassName = useCallback(
    (value) =>
      String(value) === String(activeSort) ? "sort-btn active-btn" : "sort-btn",
    [activeSort]
  );

  return (
    <div className="btn-group">
      {Object.entries(SORT).map(([name, handle], index) => (
        <button
          key={index}
          value={name}
          onClick={handleActiveSort}
          className={handleButtonClassName(handle)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
