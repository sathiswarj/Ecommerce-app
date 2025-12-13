import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPostServiceWrapper } from "../WrapperService";
import { getUserToken } from "../../utils/storage";

export const ApiPostRequest = {
  register: (name, email, password) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/register",
      headers: { "Content-Type": "application/json" },
      body: { name, email, password },
    });
  },

  login: async (email, password) => {
    const token = await getUserToken(); 
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/login",
      headers: { 
         "Authorization": token ? `Bearer ${token}` : "",
         "Content-Type": "application/json"
      },
      body: { email, password },
    });
  },
   verifyOTP: (otp) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/verify-email-otp",
      headers: { "Content-Type": "application/json" },
      body: { otp },
    });
  },
};
