import React from "react";
import "./CV.css";
import { useNavigate } from "react-router-dom";

function CVItem({ id, title, date }) {
  const navigate = useNavigate();
  const handleRedactCV = () => {
    navigate(`/main/redactor/${id}`);
  };
  const handleDownloadCV = () => {
    navigate(`/main/download/${id}`);
  };

  return (
    <div className="cv">
      <div className="cv__item" onClick={handleRedactCV}>
        <div className="cv__date"> {date}</div>
        <div className="cv__name">{title}</div>
      </div>
      <div className="cv__action">
        <div className="cv__action-item-container" onClick={handleDownloadCV}>
          <div className="cv__action-item">
            <img
              className="cv__action-item-img"
              src="./src-img/download.png"
              alt="download"
            />
          </div>
        </div>
        <div className="cv__action-item-container">
          <div className="cv__action-item">
            <img
              className="cv__action-item-img"
              src="./src-img/trash.png"
              alt="delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CVItem);
