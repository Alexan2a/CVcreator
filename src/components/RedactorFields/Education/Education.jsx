import React from "react";

function Education({
  id,
  degree,
  name,
  city,
  startYear,
  endYear,
  onDelete,
  onSetValue,
}) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleSetValue = (e, property) => {
    onSetValue(property, e.target.value, id);
  };

  return (
    <div className="data-field data-field-type-box">
      <div className="data-title">
        <div className="redactor-fields__item-title">Education</div>
        <div className="button-container">
          <button className="button button-form-round" onClick={handleDelete}>
            -
          </button>
        </div>
      </div>
      <div className="data-field">
        <div className="data-field__input-container">
          Degree
          <input
            type="text"
            placeholder="Degree"
            className="input-field"
            value={degree}
            onChange={(e) => handleSetValue(e, "degree")}
          />
        </div>
        <div className="data-field__name">
          <div className="data-field__input-container">
            Educational institution
            <input
              type="text"
              placeholder="Educational institution"
              className="input-field"
              value={name}
              onChange={(e) => handleSetValue(e, "name")}
            />
          </div>

          <div className="data-field__input-container">
            City
            <input
              type="text"
              placeholder="City"
              className="input-field"
              value={city}
              onChange={(e) => handleSetValue(e, "city")}
            />
          </div>
        </div>
        <div className="data-field__name">
          <div className="data-field__input-container">
            Year of start
            <input
              type="text"
              placeholder="Year of start"
              className="input-field"
              value={startYear}
              onChange={(e) => handleSetValue(e, "startYear")}
            />
          </div>
          <div className="data-field__input-container">
            Year of graduation
            <input
              type="text"
              placeholder="Year of graduation"
              className="input-field"
              value={endYear}
              onChange={(e) => handleSetValue(e, "endYear")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Education);
