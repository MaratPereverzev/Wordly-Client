export const addFields = (data, objectsArr) => {
  data?.map((item) => {
    objectsArr.forEach((object) => (item[object.field] = object.value));
    return item;
  });
};
