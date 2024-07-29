import axios from 'axios';

// Function to call the POST API
const postApiCall = async (url, payload) => {
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};


const postFileApiCall = async (url, file, text) => {
  try {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('question', text);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};


const getprevQuery = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};


const deleteuploadedFile = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};

export { postApiCall, postFileApiCall,getprevQuery,deleteuploadedFile };
