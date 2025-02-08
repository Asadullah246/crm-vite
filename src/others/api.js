import { toastError } from "../component/Alert";
import api from "./apiService";

// GET request
export const getData = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      // console.log("res", response); 
      return response.data; // Return the data from the response
    } catch (error) {
      handleError(error);
    }
  };

  // POST request
  export const postData = async (endpoint, data) => {
    console.log("end pont", endpoint, "coming data", data);
    try {

      const response = await api.post(endpoint, data);
      console.log("res", response);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  // PUT request (for updates)
  export const updateData = async (endpoint, data) => {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  // DELETE request
  export const deleteData = async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  // Error handling function
  const handleError = (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      // toastError(`API Error: ${error.response.data.message || 'Something went wrong'}`);
    } else if (error.request) {
      console.error('Network Error: No response received');
      // toastError('Network Error: No response received');
    } else {
      console.error('Request Setup Error:', error.message);
      // toastError(`Error: ${error.message}`);
    }
  };
