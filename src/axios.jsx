import Axios from "axios";
// import { useHistory } from "react-router";

const baseURL = "http://localhost:8000/";
const axios = Axios.create({
  timeout: 3000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
  },
});

axios.interceptors.request.use(  // to add Authoriztion token before request is sent
    function(config){
        config.headers['Authorization'] = localStorage.getItem("access_token")
        ? "Bearer " + localStorage.getItem("access_token")
        : null
        return config
    }, 
    function(error){
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
  (reponse) => {
    return reponse;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert("A server/network error occurred");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 && // if you have already made requests to refresh url and still havent recieved anything that means that your refresh token has been expired and you need to login again with your credentials
      originalRequest.url === baseURL + "api/token/refresh/"
    ) {
      // to prevent looping requests on refresh url
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1])); // decoding payload of the JWT token

        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axios
            .post(baseURL + "api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axios.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axios(originalRequest);
            })
            .catch((error) => {
              alert("Error occured while making request for refresh token");
              console.log(error.request);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login";
        }
      } else {
        console.log("Refresh Token is not available");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
    return Promise.reject(error); // if the user is not logged and doesnt have any refesh/access tokens
  }
);
const axiosAuthInstance = Axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 3000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
export default axios;
export { axiosAuthInstance };
