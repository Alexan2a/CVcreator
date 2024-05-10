export function filterByChosen(arr, checkboxArr, property) {
  const filterArr = checkboxArr
    .filter((item) => item.chosen)
    .map((item) => item[property]);
  return filterArr.length === 0
    ? arr
    : arr.filter((item) => {
        for (let i = 0; i < filterArr.length; i++) {
          if (item[property] === filterArr[i]) return true;
        }
        return false;
      });
}
