import { createContext, useContext, useRef } from "react";
import { postApiCall, postFileApiCall, getprevQuery, deleteuploadedFile } from "../service/Service";
import { useState } from "react";


const ApiContext = createContext();


const ApiProvider = (props) => {
  const [response, setResponse] = useState("");

  const [prevMessage, setprevMessage] = useState([]);
  const inputRef = useRef();
  const [prev, setPrev] = useState("");
  const [initState, setInitState] = useState();

  const [resultData, setresultData] = useState("");
  const [showResponse, setShowResponse] = useState(true)



  const apiMethods = {
    postApiCall: (url, payload) => postApiCall(url, payload),
    postFileApiCall: (url, file, text) => postFileApiCall(url, file, text),
    getprevQuery: (url) => getprevQuery(url),
    deleteuploadedFile: (url) => deleteuploadedFile(url),
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
  console.log(response);
  return (
    <ApiContext.Provider value={apiMethods}>
      {props.children}
    </ApiContext.Provider>
  );
};


const useApi = () => {
  return useContext(ApiContext);
};

export { ApiProvider, useApi };