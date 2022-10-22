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

  fetchAllSubscriptions: async () => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/subscriptions/";
    console.log("ENDPOINT IN FETCH SUBSCRIPTIONS: ", endpoint);
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };
    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
  },

  fetchOneSubscription: async (subscriptionId) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + `/subscriptions/${subscriptionId}/`;
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
  },
};

export default API;
