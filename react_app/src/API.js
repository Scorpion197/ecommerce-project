import axios from "axios";

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
    const endpoint = API_URL + `/products/${productId}/`;
    const token = localStorage.getItem("token");
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
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

  updateProduct: async (id, productData) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/products/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("color", productData.color);
    formData.append("id", id);
    formData.append("quantity", productData.quantity);
    formData.append("barcode", productData.barcode);
    formData.append("weight", productData.weight);
    formData.append("sku", productData.sku);
    formData.append("images", productData.images);
    const response = await axios.put(endpoint, formData, requestConfig);
    return response;
  },

  fetchProductCategories: async (flatArray = true) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + `/categories/`;
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, requestConfig)).json();
    return flatArray ? response.map((el) => el.name) : response;
  },
  addNewProduct: async (productData) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/products/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("color", productData.color);
    formData.append("quantity", productData.quantity);
    formData.append("barcode", productData.barcode);
    formData.append("weight", productData.weight);
    formData.append("sku", productData.sku);
    formData.append("images", productData.images);
    formData.append("token", token);
    const response = await axios.post(endpoint, formData, requestConfig);
    localStorage.setItem("productId", response?.data?.id);
    return response;
  },
  addNewCategorie: async (title) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/categories/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("name", title);

    const response = await axios.post(endpoint, formData, requestConfig);
    return response.data;
  },
  editCategory: async (id, title) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/categories/" + id + "/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("name", title);
    const response = await axios.put(endpoint, formData, requestConfig);
    return response.data;
  },
  removeCategory: async (id) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/categories/" + id + "/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await axios.delete(endpoint, requestConfig);
    return response.data;
  },

  removeProduct: async (id) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/products/" + id + "/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.delete(endpoint, requestConfig);
    return response.data;
  },

  fetchOrders: async () => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/orders/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
  },
  fetchOneOrder: async (orderId) => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + `/orders/${orderId}/`;
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };

    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
  },

  fetchColors: async () => {
    const token = localStorage.getItem("token");
    const endpoint = API_URL + "/colors/";
    const requestConfig = {
      headers: {
        Authorization: "Token " + token,
      },
    };
    const response = await (await fetch(endpoint, requestConfig)).json();
    return response;
  },

  fetchSubscriptionTypes: async () => {
    const endpoint = API_URL + "/subscriptionlist/";
    const response = await (await fetch(endpoint)).json();
    return response;
  },
};

export default API;
