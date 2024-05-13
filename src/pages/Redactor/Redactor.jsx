import { useCallback, useMemo, useReducer, useState } from "react";
import PersonalData from "../../components/RedactorFields/PersonalData/PersonalData";
import "./Redactor.css";
import Education from "../../components/RedactorFields/Education/Education";
import EducationList from "../../components/RedactorFields/Education/EducationList";
import ExperienceList from "../../components/RedactorFields/Experience/ExperienceList";
import SkillList from "../../components/RedactorFields/Skills/SkillList";

const initialState = {
  name: "",
  surname: "",
  email: "",
  title: "",
  phone: "",
  adress: "",
  about: "",
  experiences: [],
  skills: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_SURNAME":
      return { ...state, surname: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_ADRESS":
      return { ...state, adress: action.payload };
    case "SET_ABOUT":
      return { ...state, about: action.payload };
    default:
      throw new Error();
  }
}

function Redactor() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleAddEducation = () => {
    const educ = {
      id: +Date.now() + educations.length,
      degree: "",
      name: "",
      city: "",
      startYear: "",
      endYear: "",
    };
    setEducations((currentEducation) => currentEducation.concat(educ));
  };

  const handleAddExperience = () => {
    const exp = {
      id: +Date.now() + educations.length,
      position: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
    };
    setExperiences((currentExperience) => currentExperience.concat(exp));
  };

  const handleAddSkill = () => {
    const skill = {
      id: +Date.now() + educations.length,
      name: "",
      level: 50,
    };
    setSkills((currentSkills) => currentSkills.concat(skill));
  };

  return (
    <div className="redactor">
      <div className="overlay overlay-side-left">
        <div className="redactor-fields">
          <PersonalData
            name={state.name}
            surname={state.surname}
            email={state.email}
            title={state.title}
            phone={state.phone}
            adress={state.adress}
            onSetValue={dispatch}
          />
          <EducationList
            educations={educations}
            onSetEducations={setEducations}
          />
          <div className="redactor-fields__item">
            <div className="redactor-fields__item-title">Education</div>
            <div className="button-container">
              <button
                className="button button-form-round"
                onClick={handleAddEducation}
              >
                +
              </button>
            </div>
          </div>
          <ExperienceList
            experiences={experiences}
            onSetExperiences={setExperiences}
          />
          <div className="redactor-fields__item">
            <div className="redactor-fields__item-title">Experience</div>
            <div className="button-container">
              <button
                className="button button-form-round"
                onClick={handleAddExperience}
              >
                +
              </button>
            </div>
          </div>
          <SkillList skills={skills} onSetSkills={setSkills} />
          <div className="redactor-fields__item">
            <div className="redactor-fields__item-title">Skill</div>
            <div className="button-container">
              <button
                className="button button-form-round"
                onClick={handleAddSkill}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Redactor;
