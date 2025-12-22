import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiGetServiceWrapper } from '../WrapperService';
import { getUserToken } from "../../utils/storage";

export const ApiRequestGet = {
  getAllProducts: async () => {
    const token = await getUserToken();  

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "products", 
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },

  getOneUser: async () => {
    const token = await getUserToken();  
    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "users/getuser",  
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },

  getOneProduct: async (productId) => {
    const token = await getUserToken();  

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + `products/${productId}`, 
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },

  getAllCart: async () => {
    const token = await getUserToken();

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "carts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },
};