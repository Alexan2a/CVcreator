import React, { useCallback } from "react";
import Education from "./Education";

function EducationList({ educations, onSetEducations }) {
  const handleDeleteEducation = useCallback(
    (id) => {
      onSetEducations((currentEducations) =>
        currentEducations.filter((ed) => ed.id !== id)
      );
    },
    [onSetEducations]
  );

  const handleSetValue = useCallback(
    (property, value, id) => {
      onSetEducations((currentEducations) =>
        currentEducations.map((ed) =>
          ed.id === id ? { ...ed, [property]: value } : ed
        )
      );
    },
    [onSetEducations]
  );

  return (
    <div className="data-field">
      {educations.length !== 0
        ? educations.map((item, index) => (
            <Education
              key={index}
              id={item.id}
              degree={item.degree}
              name={item.name}
              city={item.city}
              startYear={item.startYear}
              endYear={item.endYear}
              onSetValue={handleSetValue}
              onDelete={handleDeleteEducation}
            />
          ))
        : ""}
    </div>
  );
}

export default React.memo(EducationList);
