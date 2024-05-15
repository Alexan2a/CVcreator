import "./Main.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Sort from "../../components/Sort/Sort";
import SideBar from "../../components/SideBar/SideBar";
import CVList from "../../components/CV/CVList";
import useInputValue from "../../hooks/use-input-value";
import { useCallback } from "react";
import { useSelector } from "react-redux";

function Main() {
  const [name, , handleSetName] = useInputValue("");
  const [debouncedName, setDebouncedName] = useState("");
  const [opacity, setOpacity] = useState("");
  const [activeSort, setActiveSort] = useState(
    () => (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  const handleSetActiveSort = useCallback((value) => setActiveSort(value), []);

  const username = useSelector((store) => store.username);
  const navigate = useNavigate();

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

  const handleAddCV = () => {
    navigate("/main/redactor/new");
  };

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main">
      <div className="welcome" style={{ opacity: opacity }}>
        <div className="welcome__text">
          <h1>Welcome, {username} !</h1>
        </div>
      </div>
      <SideBar username={username} />
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
              <button className="button button-size-s" onClick={handleAddCV}>
                + add new
              </button>
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
