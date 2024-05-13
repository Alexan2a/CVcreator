import "./CV.css";
import { generateCVs } from "../../utils/generateCVs";
import { useEffect, useMemo, useState } from "react";
import CVItem from "./CVItem";

function CVList({ name, activeSort }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Command: "LOAD_RESUMES",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setIsLoading(false);
      });
  }, []);

  const searchItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [name, items]);

  const itemsToDisplay = useMemo(() => {
    return searchItems.sort(activeSort);
  }, [activeSort, searchItems]);

  return (
    <div className="cv-list">
      {isLoading && (
        <div className="loading">
          <img src="./src-img/load.gif" alt="Loading..." />
        </div>
      )}
      {!isLoading &&
        !!itemsToDisplay.length &&
        itemsToDisplay.map((item) => <CVItem key={item.id} {...item} />)}
      {!isLoading && !itemsToDisplay.length && (
        <span className="nothing-found">Nothing is found...</span>
      )}
    </div>
  );
}

export default CVList;
