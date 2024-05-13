import React, { useCallback } from "react";
import Skill from "./Skill";

function SkillList({ skills, onSetSkills }) {
  const handleDelete = useCallback(
    (id) => {
      onSetSkills((currentSkills) =>
        currentSkills.filter((skill) => skill.id !== id)
      );
    },
    [onSetSkills]
  );

  const handleSetValue = useCallback(
    (property, value, id) => {
      onSetSkills((currentSkills) =>
        currentSkills.map((skill) =>
          skill.id === id ? { ...skill, [property]: value } : skill
        )
      );
    },

    [onSetSkills]
  );

  return (
    <div className="data-field">
      {skills.length !== 0
        ? skills.map((item) => (
            <Skill
              key={item.id}
              id={item.id}
              name={item.name}
              level={item.level}
              onSetValue={handleSetValue}
              onDelete={handleDelete}
            />
          ))
        : ""}
    </div>
  );
}

export default React.memo(SkillList);
