import "./CV.css";
import { useEffect, useMemo, useState } from "react";
import CVItem from "./CVItem";
import { generateCVs } from "../../utils/generateCVs";
import { useDispatch } from "react-redux";

function CVList({ name, activeSort }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    setItems(generateCVs(5));
    //setIsLoading(true);
    // fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     Command: "LOAD_RESUMES",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data === "Invalid token") {
    //       dispatchRedux({ type: "DELETE_USERNAME" });
    //       alert(`Time of session is over. Please, repeat log in`);
    //       localStorage.removeItem("token");
    //       localStorage.removeItem("username");
    //     }
    //     setItems(data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Ошибка:", error);
    //     setIsLoading(false);
    //   });
  }, [dispatchRedux]);

  const searchItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(name.toLowerCase())
    );
  }, [name, items]);

  const itemsToDisplay = useMemo(() => {
    return searchItems.sort(activeSort);
  }, [activeSort, searchItems]);

  return (
    <div className="items-list">
      {isLoading && (
        <div className="loading">
          <img src="./src-img/load.gif" alt="Loading..." />
        </div>
      )}
      {!isLoading &&
        !!itemsToDisplay.length &&
        itemsToDisplay.map((item) => (
          <CVItem
            key={item.resumeId}
            id={item.resumeId}
            {...item}
            onSet={setItems}
          />
        ))}
      {!isLoading && !itemsToDisplay.length && (
        <span className="nothing-found">Nothing is found...</span>
      )}
    </div>
  );
}

export default CVList;
