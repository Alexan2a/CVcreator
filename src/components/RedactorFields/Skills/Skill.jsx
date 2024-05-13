import React from "react";

function Skill({ id, name, level, onDelete, onSetValue }) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleSetValue = (e, property) => {
    onSetValue(property, e.target.value, id);
  };

  return (
    <div className="data-field data-field-type-box">
      <div className="data-title">
        <div className="redactor-fields__item-title">Skill</div>
        <div className="button-container">
          <button className="button button-form-round" onClick={handleDelete}>
            -
          </button>
        </div>
      </div>
      <div className="data-field">
        <div className="data-field__input-container">
          {/* Position */}
          <input
            type="text"
            placeholder="Skill"
            className="input-field"
            value={name}
            onChange={(e) => handleSetValue(e, "name")}
          />
        </div>
        <div className="data-field__name">
          <div className="data-field__input-container">
            Level
            <div className="Range Range__large">
              <input
                id="RangeLarge"
                name="RangeLarge"
                type="range"
                min="0"
                max="100"
                step="50"
                value={level}
                onChange={(e) => handleSetValue(e, "level")}
              />
            </div>
            <div className="level">
              <div>
                <label>low</label>
              </div>
              <div>
                <label>middle</label>
              </div>
              <div>
                <label>high</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Skill);
