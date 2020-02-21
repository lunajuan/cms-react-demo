/* eslint-disable import/prefer-default-export */
export const removeIndex = (array, index) => {
  // clone the array
  const newArray = [...array];

  // remove the element from the array
  newArray.splice(index, 1);

  return newArray;
};
