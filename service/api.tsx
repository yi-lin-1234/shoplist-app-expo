import axios from "axios";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
// });

//prod
const instance = axios.create({
  baseURL: "https://shoplist-react-native-server-production.up.railway.app/",
});

type Body = {
  name: string;
  category: string;
};

//==============================( POST )==============================

// create new item
export const createItem = async (body: Body) => {
  await instance.post("item", body);
};

//=======================( GET )===========================

// fetch all unpurchased items
export const getUnpurchasedItems = async () => {
  const response = await instance.get("all-unpurchased-items");
  return response.data.items;
};

// fetch all purchased items
export const getPurchasedItems = async () => {
  const response = await instance.get("all-purchased-items");
  return response.data.items;
};

// get item by id
export const getItemById = async (id: string | string[]) => {
  const response = await instance.get(`item/${id}`);
  return response.data.item;
};

// group items by category
export const getItemCountByCategory = async () => {
  const response = await instance.get("items-count-by-category");
  return response.data.data;
};

//==============================( PUT )==============================

// update item purchased to true
export const markItemAsPurchased = async (id: string | string[]) => {
  await instance.put(`item-purchased/${id}`);
};

//update item content
export const updateItemById = async (id: string | string[], body: Body) => {
  await instance.put(`item/${id}`, body);
};

//==============================( DELETE )==============================

// delete a item by id
export const deleteItemById = async (id: string | string[]) => {
  await instance.delete(`item/${id}`);
};
