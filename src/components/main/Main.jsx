import "./Main.css";
import { FaUserAstronaut } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegMessage } from "react-icons/fa6";
import { IoCodeSlashSharp } from "react-icons/io5";
import { SiOpenai } from "react-icons/si";

import { FaMapLocationDot } from "react-icons/fa6";
import { FcLink } from "react-icons/fc";

import { FaCircleArrowUp } from "react-icons/fa6";
import { useState } from "react";
import { useApi } from "../../context/Context";

function Main() {
  const [upload, setUplaod] = useState(false);
  const [input, setinput] = useState("");
  const {
    postApiCall,
    postFileApiCall,

    setResponse,
    inputRef,
    prev,
    // setPrev,
    response,
    initState,
    setInitState,
    setShowResponse,
    showResponse,
  } = useApi();

  // const {response, setResponse} = ApiProvider();
  const [file, setFile] = useState(null);

  const fetchAPI = async () => {
    try {
      const data = await postApiCall("http://localhost:9000/", {
        question: input,
      });
      setInitState(true);
      setResponse(data);
      setShowResponse(true);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchApiFile = async () => {
    try {
      const data = await postFileApiCall(
        "http://localhost:9000/file",
        file,
        input
      );
      setInitState(true);
      setShowResponse(true);
      setResponse(data);
      console.log("Response:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSend = () => {
    if(upload){
      fetchApiFile()
    }else fetchAPI()
    setinput("");
  };

  return (
    <div className="main">
      <div className="nav">
        <p>ChatGPT</p>
        <FaUserAstronaut />
      </div>
      <div className="main-container">
        <>
          <div className="greet">
            <div className="openai">
              <SiOpenai />
            </div>
          </div>

          {initState ? (
            <div className="res">{showResponse ? <p>{response}</p> : <p>{prev}</p>}</div>
          ) : (
            <>
              <div className="cards">
                <div className="card">
                  <FaMapLocationDot />

                  <p>Suggest beautiful place to visit in Japan</p>
                </div>
                <div className="card">
                  <HiOutlineLightBulb />
                  <p>briefly summarize this concept: Quantam Computing</p>
                </div>
                <div className="card">
                  <FaRegMessage />
                  <p>How to improve my communication skill in team meeting</p>
                </div>
                <div className="card">
                  <IoCodeSlashSharp />
                  <p>
                    How can I improve the time and space complexity of following
                    java code
                  </p>
                </div>
              </div>
            </>
          )}
        </>

        <>
          <div className="result">
            <div className="result-data"></div>
          </div>
        </>

        <div className="main-bottom">
          {upload && (
            <div>
              <input type="file" onChange={handleFileChange} required />
            </div>
          )}
          <div className="search-box">
            <FcLink className="facircle" onClick={() => setUplaod(!upload)} />

            <input
              ref={inputRef}
              onChange={(e) => setinput(e.target.value)}
              type="text"
              value={input}
              placeholder="Enter a prompt here"
            />
            <div>
              <FaCircleArrowUp className="facircle" onClick={handleSend} />
            </div>
          </div>
          <p className="bottom-info">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
