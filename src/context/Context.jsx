import { createContext, useContext, useRef } from "react";
import { postApiCall, postFileApiCall, getprevQuery } from "../service/Service";
import { useState } from "react";

// Create a context
const ApiContext = createContext();

// Create a provider component
const ApiProvider = (props) => {
  const [response, setResponse] = useState("");

  const [prevMessage, setprevMessage] = useState([]);
  const inputRef = useRef();
  const [prev, setPrev] = useState("");
  const [initState, setInitState] = useState();

  const [resultData, setresultData] = useState("");
  const [showResponse, setShowResponse] = useState(true)


  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 150 * index);
  };
  let newResponse_array = response.split(" ");

  // console.log(newResponse_array);
  for (let i = 0; i < newResponse_array.length; i++) {
    const nextWord = newResponse_array[i];
    delayPara(i, nextWord + " ");
  }



  // Define API methods to be provided
  const apiMethods = {
    postApiCall: (url, payload) => postApiCall(url, payload),
    postFileApiCall: (url, file, text) => postFileApiCall(url, file, text),
    getprevQuery: (url) => getprevQuery(url),
    response,
    setResponse,
    prevMessage,
    setprevMessage,
    inputRef,
    prev,
    setPrev,
    resultData,
    initState, 
    setInitState,
    setShowResponse,
    showResponse
    
  };

  return (
    <ApiContext.Provider value={apiMethods}>
      {props.children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
const useApi = () => {
  return useContext(ApiContext);
};

export { ApiProvider, useApi };
