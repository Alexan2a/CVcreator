import { useEffect, useMemo, useState } from "react";
import "./Download.css";
import { Navigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Template1 from "../../components/Templates/Template1";
import Template2 from "../../components/Templates/Template2";
import { useDispatch, useSelector } from "react-redux";

function Download() {
  let { id } = useParams();
  const dispatchRedux = useDispatch();
  const username = useSelector((store) => store.username);
  const [activeBtn, setActiveBtn] = useState(0);
  const [state, setState] = useState({
    resume: {
      name: "",
      surname: "",
      email: "",
      title: "",
      phone: "",
      adress: "",
      about: "",
    },
    educations: [],
    experiences: [],
    skills: [],
  });

  const OPTIONS = useMemo(
    () => ["./src-img/template1.png", "./src-img/template2.png"],
    []
  );

  useEffect(() => {
    let templates = document.querySelectorAll(".template-border");
    templates.forEach((item, index) => {
      if (index === activeBtn) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }, [activeBtn]);

  useEffect(() => {
    console.log(id);
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
        if (data === "Invalid token") {
          dispatchRedux({ type: "DELETE_USERNAME" });
          alert(`Time of session is over. Please, repeat log in`);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
        setState(data);
      })
      .catch((error) => console.error("Ошибка:", error));
  }, [id, dispatchRedux]);

  const handleDownload = () => {
    let element = document.querySelectorAll(".template")[activeBtn];
    console.log(element);
    html2pdf().from(element).save();
  };

  if (!username) {
    return <Navigate to="/" />;
  }
  return (
    <div className="download">
      <div className="side-bar side-bar__column">
        <div className="side-bar__option-list .side-bar__option-list-scroll">
          {OPTIONS.map((option, index) => (
            <div
              key={index}
              className={
                activeBtn === index
                  ? `side-bar__option side-bar__option-type-template temp${index} side-bar__option-active`
                  : `side-bar__option side-bar__option-type-template temp${index}`
              }
              onClick={() => {
                setActiveBtn(index);
              }}
            ></div>
          ))}
        </div>

        <button
          className="button button-size-l button-margin"
          onClick={handleDownload}
        >
          download
        </button>
      </div>
      <div className="template-container">
        <div className="template-border">
          <Template1 {...state} />
        </div>
        <div className="template-border">
          <Template2 {...state} />
        </div>
      </div>
    </div>
  );
}

export default Download;
