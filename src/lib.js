/* eslint-disable import/prefer-default-export */
export const removeIndex = (array, index) => {
  // clone the array
  const newArray = [...array];

  // remove the element from the array
  newArray.splice(index, 1);

  return newArray;
};

export const trim = (string, maxLength, more = '...') => {
  if (string.length > maxLength) {
    const trimmedString = string.substring(0, maxLength + 1);
    return `${trimmedString}${more}`;
  }

  return string;
};
