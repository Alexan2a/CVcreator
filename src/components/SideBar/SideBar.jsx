import "./SideBar.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../UserContextProvider";
import { useDispatch } from "react-redux";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const dispatchRedux = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      let optionText = document.querySelectorAll(".side-bar__option-text");
      optionText.forEach((text) => {
        text.style.display = "flex";
      });
      document.querySelector(".side-bar").style.width = "20%";
      document.querySelector(".main-item").style.width = "80%";
      document.querySelector(".side-bar__button").style.width = "10%";
      //   let optionImage = document.querySelectorAll(".side-bar__option-image");
      //   optionImage.forEach((image) => {
      //     image.style.width = "20%";
      //   });
    } else {
      let optionText = document.querySelectorAll(".side-bar__option-text");
      optionText.forEach((text) => {
        text.style.display = "none";
      });
      document.querySelector(".side-bar").style.width = "8%";
      document.querySelector(".main-item").style.width = "92%";
      document.querySelector(".side-bar__button").style.width = "30%";
      //   let optionImage = document.querySelectorAll(".side-bar__option-image");
      //   optionImage.forEach((image) => {
      //     image.style.width = "100%";
      //   });
    }
  }, [isOpen]);

  const arrow = useMemo(() => {
    if (isOpen) return String.fromCharCode(11208);
    return String.fromCharCode(11207);
  }, [isOpen]);

  const handleSetIsOpen = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const OPTIONS = useMemo(
    () => [
      { text: "Settings", imgURL: "./src-img/settings.png", action: () => "" },
      { text: "About us", imgURL: "./src-img/about.png", action: () => "" },
      {
        text: "Contacts",
        imgURL: "./src-img/contacts.png",
        action: () => console.log("a"),
      },
      {
        text: "Log out",
        imgURL: "./src-img/logout.png",
        action: () => {
          dispatchRedux({ type: "DELETE_USERNAME" });
          //localStorage.removeItem("token");
          localStorage.removeItem("username");
        },
      },
    ],
    [dispatchRedux]
  );

  return (
    <div className="side-bar">
      <div className="side-bar__menu">
        <div className="side-bar__option-list">
          {OPTIONS.map((option, index) => (
            <div
              key={index}
              value={option.text}
              className="side-bar__option"
              onClick={option.action}
            >
              <img
                className="side-bar__option-image"
                src={option.imgURL}
                alt={option.text}
              />
              <div className="side-bar__option-text">{option.text}</div>
            </div>
          ))}
        </div>
        <div className="side-bar__option side-bar__option-user">
          <img
            className="side-bar__user-image"
            src="./img/img1.jpg"
            alt={user}
          />
          <div className="side-bar__option-text side-bar__user-text">
            {user}
          </div>
        </div>
      </div>
      <div className="side-bar__button" onClick={handleSetIsOpen}>
        {arrow}
      </div>
    </div>
  );
}

export default React.memo(SideBar);
