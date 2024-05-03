export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(), //adding new field id to the array
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest); //removing _id from the array using array destructuring

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };

  return updatedObj;
};
