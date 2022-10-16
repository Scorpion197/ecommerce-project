const API_URL = process.env.REACT_APP_BACKEND_API_URL;
const API = {
  fetchAllProducts: async () => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/products/";
    const config = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, config)).json();
    return response;
  },

  fetchOneProduct: async (productId) => {
    console.log("fetching product id");
    console.log("fetching product id");
  },
};

export default API;
