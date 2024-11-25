import { AxiosResponse } from "axios";
export const addFields = (
  data: any[],
  objectsArr: { field: string; value: any }[]
) => {
  data?.map((item) => {
    objectsArr.forEach((object) => (item[object.field] = object.value));
    return item;
  });
};
