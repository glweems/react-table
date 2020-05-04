import axios from "axios";
import { makeUseAxios } from "axios-hooks";
export const api_key = "FBP4KKkRaT7bg0t9JbEtNGGkEHGLMAjjK7LK0pYJ";
export const AxiosInstance = axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key,
  },
});

export default makeUseAxios({ axios: AxiosInstance });
