import "./Main.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sort from "../../components/Sort/Sort";
import SideBar from "../../components/SideBar/SideBar";
import CVList from "../../components/CVList/CVList";
import useInputValue from "../../hooks/use-input-value";
import { useCallback } from "react";
import { useSelector } from "react-redux";

function Main() {
  const [name, , handleSetName] = useInputValue("");
  const [debouncedName, setDebouncedName] = useState("");
  const [opacity, setOpacity] = useState("");
  const [activeSort, setActiveSort] = useState(() => (a, b) => b.date - a.date);
  const handleSetActiveSort = useCallback((value) => setActiveSort(value), []);

  const stateRedux = useSelector((store) => store);

  useEffect(() => {
    setOpacity(1);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    setTimeout(() => {
      setOpacity(0);
    }, 2000);
    setTimeout(() => {
      try {
        document.querySelector(".welcome").style.display = "none";
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      } catch {}
    }, 3000);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedName(name), 300);
    return () => clearTimeout(id);
  }, [name]);

  if (!stateRedux.username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main">
      <div className="welcome" style={{ opacity: opacity }}>
        <div className="welcome__text">
          <h1>Welcome, {stateRedux.username} !</h1>
        </div>
      </div>
      <SideBar />
      <div className="main-item">
        <div className="header">
          <div className="overlay">
            <img className="logo-img" src="" alt="CVCreator" />
          </div>
        </div>
        <div className="option">
          <div className="option-container">
            <input
              type="text"
              placeholder="Search"
              className="input-field"
              value={name}
              onChange={handleSetName}
            />
            <div className="sort-items">
              <button className="button button-size-s">+ add new</button>
              <Sort
                activeSort={activeSort}
                onSetActiveSort={handleSetActiveSort}
              />
            </div>
          </div>
        </div>
        <div className="cv-list-container">
          <CVList name={debouncedName} activeSort={activeSort} />
        </div>
      </div>
    </div>
  );
}

export default Main;
