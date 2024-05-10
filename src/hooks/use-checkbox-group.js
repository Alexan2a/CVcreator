import { useCallback, useState } from "react";

export default function useCheckboxGroup(defaultValue, property, className) {
  const [value, setValue] = useState(
    defaultValue.map((item) => {
      return {
        ...item,
        className,
      };
    })
  );
  const handler = useCallback(
    (propValue, checked) => {
      setValue(
        value.map((item) =>
          item[property] === propValue
            ? {
                ...item,
                chosen: checked,
                className: checked ? className + " active" : className,
              }
            : item
        )
      );
    },
    [value, property, className]
  );
  return [value, setValue, handler];
}
