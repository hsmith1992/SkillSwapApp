import { API } from "@/config";

export const getProducts = (sortBy, order = "desc", limit = 6) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const readSkill = (id) => {
  return fetch(`${API}/skill/${id}`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
