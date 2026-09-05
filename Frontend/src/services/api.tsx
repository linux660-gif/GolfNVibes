import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


interface CustomError {
  message:string

}

const api = axios.create({
  baseURL: "http://192.168.100.56:8000/",
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
          toast.error("Resource Already Exists");
          break;
        case 500:
          toast.error("Internal Server Error.");
          break
        case 404:
          toast.error("Resource Not Found");
          break;
        default:
          toast.error(`Error: ${serverMessage}`);
      } 
    }else if (error.request){
      toast.error("Failed, Try Again Later")
    }else{
      toast.error(`Request Error: ${error.message}`);
    }
    return Promise.reject(error)

  }
)
export default api;