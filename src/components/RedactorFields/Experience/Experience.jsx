import React from "react";

function Experience({
  id,
  position,
  company,
  city,
  startDate,
  endDate,
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
        <div className="redactor-fields__item-title">Experience</div>
        <div className="button-container">
          <button className="button button-form-round" onClick={handleDelete}>
            -
          </button>
        </div>
      </div>
      <div className="data-field">
        <div className="data-field__input-container">
          Position
          <input
            type="text"
            placeholder="Position"
            className="input-field"
            value={position}
            onChange={(e) => handleSetValue(e, "position")}
          />
        </div>
        <div className="data-field__name">
          <div className="data-field__input-container">
            Company
            <input
              type="text"
              placeholder="Company"
              className="input-field"
              value={company}
              onChange={(e) => handleSetValue(e, "company")}
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
            Start date
            <input
              type="date"
              placeholder="Start date"
              className="input-field"
              value={startDate}
              onChange={(e) => handleSetValue(e, "startDate")}
            />
          </div>
          <div className="data-field__input-container">
            End date
            <input
              type="date"
              placeholder="End date"
              className="input-field"
              value={endDate}
              onChange={(e) => handleSetValue(e, "endDate")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Experience);
