import React, { useCallback } from "react";
import Experience from "./Experience";

function ExperienceList({ experiences, onSetExperiences }) {
  const handleDelete = useCallback(
    (id) => {
      onSetExperiences((currentExperiences) =>
        currentExperiences.filter((exp) => exp.id !== id)
      );
    },
    [onSetExperiences]
  );

  const handleSetValue = useCallback(
    (property, value, id) => {
      onSetExperiences((currentExperiences) =>
        currentExperiences.map((exp) =>
          exp.id === id ? { ...exp, [property]: value } : exp
        )
      );
    },
    [onSetExperiences]
  );

  return (
    <div className="data-field">
      {experiences.length !== 0
        ? experiences.map((item) => (
            <Experience
              key={item.id}
              id={item.id}
              position={item.position}
              company={item.company}
              city={item.city}
              startDate={item.startDate}
              endDate={item.endDate}
              onSetValue={handleSetValue}
              onDelete={handleDelete}
            />
          ))
        : ""}
    </div>
  );
}

export default React.memo(ExperienceList);
