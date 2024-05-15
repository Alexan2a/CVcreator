import { useEffect, useReducer, useState } from "react";
import PersonalData from "../../components/RedactorFields/PersonalData/PersonalData";
import "./Redactor.css";
import EducationList from "../../components/RedactorFields/Education/EducationList";
import ExperienceList from "../../components/RedactorFields/Experience/ExperienceList";
import SkillList from "../../components/RedactorFields/Skills/SkillList";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  surname: "",
  email: "",
  title: "",
  phone: "",
  adress: "",
  about: "",
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

function Redactor({ isNew }) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const username = useSelector((store) => store.username);

  useEffect(() => {
    if (!isNew) {
      setIsLoading(true);
      fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Command: "LOAD_RESUME",
          ResumeId: id,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: "SET_NAME", payload: data.resume.name });
          dispatch({ type: "SET_SURNAME", payload: data.resume.surname });
          dispatch({ type: "SET_EMAIL", payload: data.resume.email });
          dispatch({ type: "SET_TITLE", payload: data.resume.title });
          dispatch({ type: "SET_PHONE", payload: data.resume.phone });
          dispatch({ type: "SET_ADRESS", payload: data.resume.adress });
          dispatch({ type: "SET_ABOUT", payload: data.resume.about });
          setEducations(data.educations);
          setExperiences(data.experiences);
          setSkills(data.skills);
          console.log(data.resume.educations);
          console.log(data.resume.experiences);
          console.log(data.resume.about);
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка:", error));
    } else {
      console.log("Я новый");
    }
  }, [id, isNew]);

  const handleSaveCV = () => {
    let d = new Date();
    let formattedDate = d.toISOString().split("T")[0];
    console.log(formattedDate);
    console.log(state);
    console.log(educations);
    console.log(skills);
    console.log(experiences);
    if (!isNew) {
      fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ResumeId: id,
        },
        body: JSON.stringify({
          command: "UPDATE_RESUME",
          ...state,
          date: formattedDate,
          experiences,
          educations,
          skills,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/main");
          console.log(data);
        })
        .catch((error) => {
          alert("Something went wrong");
          console.error("Ошибка:", error);
        });
    } else {
      fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          command: "SAVE_RESUME",
          ...state,
          date: formattedDate,
          experiences,
          educations,
          skills,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/main");
          console.log(data);
        })
        .catch((error) => {
          alert("Something went wrong");
          console.error("Ошибка:", error);
        });
    }
  };

  if (!username) {
    return <Navigate to="/" />;
  }
  const handleAddEducation = () => {
    const educ = {
      id: 0,
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
      id: 0,
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
      id: 0,
      name: "",
      level: 50,
    };
    setSkills((currentSkills) => currentSkills.concat(skill));
  };

  return (
    <div className="redactor">
      <div className="overlay overlay-side-left">
        <div className="redactor-fields">
          {isLoading && (
            <div className="loading">
              <img src="./src-img/load.gif" alt="Loading..." />
            </div>
          )}
          {!isLoading && (
            <div>
              <PersonalData
                name={state.name}
                surname={state.surname}
                email={state.email}
                title={state.title}
                phone={state.phone}
                adress={state.adress}
                about={state.about}
                onSetValue={dispatch}
              />
              <EducationList
                educations={educations}
                onSetEducations={setEducations}
              />
              <div className="redactor-fields__item">
                <div className="redactor-fields__item-title">Education</div>
                <div className="button-container button-container-size-s">
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
                <div className="button-container button-container-size-s">
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
                <div className="button-container button-container-size-s">
                  <button
                    className="button button-form-round"
                    onClick={handleAddSkill}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="button-container button-container-size-l">
                <button className="button button-size-l" onClick={handleSaveCV}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Redactor;
