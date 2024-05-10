import "./CVList.css";
import { generateCVs } from "../../utils/generateCVs";
import { useEffect, useMemo, useState } from "react";
import CVItem from "../CVItem/CVItem";

function CVList({ name, activeSort }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(generateCVs(12));
    setIsLoading(false);
    // setIsLoading(true);
    // // setTimeout(() => {
    // //   setItems(generateCVs(12));
    // //   setIsLoading(false);
    // // }, 500);
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
    <div className="items-list">
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
