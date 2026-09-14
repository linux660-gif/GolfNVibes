import axios, { AxiosError } from "axios";


interface CustomError {
  message:string

}

const api = axios.create({
  baseURL: "http://localhost/api/v1/",
  timeout: 10000,
});

api.interceptors.response.use(
  (response)=> response,
  (error: AxiosError<CustomError>) => {
    if (error.response){
      const status = error.response.status;
      const serverMessage = error.response.data?.message || "Something went Wrong";

      switch (status) {
        case 409:
          console.error("Resource Already Exists");
          break;
        case 500:
          console.error("Internal Server Error.");
          break
        case 404:
          console.error("Resource Not Found");
          break;
        default:
          console.error(`Error: ${serverMessage}`);
      } 
    }else if (error.request){
      console.error("Failed, Try Again Later")
    }else{
      console.error(`Request Error: ${error.message}`);
    }
    return Promise.reject(error)

  }
)
export default api;