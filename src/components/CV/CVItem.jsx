import React from "react";
import "./CV.css";
import { useNavigate } from "react-router-dom";

function CVItem({ id, name, date }) {
  const navigate = useNavigate();
  const handleRedactCV = () => {
    navigate(`/main/redactor/${id}`);
  };
  return (
    <div className="cv" onClick={handleRedactCV}>
      <div className="cv__date">{date}</div>
      <div className="cv__name">{name}</div>
      <div className="cv__action"></div>
    </div>
  );
}

export default React.memo(CVItem);
