import React from "react";
import "./CVItem.css";

function CVItem({ name, date }) {
  return (
    <div className="cv">
      <div className="cv__date">{date.toLocaleDateString()}</div>
      <div className="cv__name">{name}</div>
      <div className="cv__action"></div>
    </div>
  );
}

export default React.memo(CVItem);
