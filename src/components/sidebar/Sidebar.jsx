import { useEffect, useState } from "react";
import "./Sidebar.css";
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

import { useApi } from "../../context/Context";
function Sidebar() {
  const [toggleSidebar, settoggleSidebar] = useState(true);

  const {
    getprevQuery,
    response,
    prevMessage,
    setprevMessage,
    inputRef,
    setPrev,
    setInitState,
    setShowResponse
  } = useApi();

  const callChatApi = async () => {
    try {
      const data = await getprevQuery("http://localhost:9000/chat");
      setprevMessage(data.history);
      // console.log(chatResponse);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const handleInputFocus = () => {
    settoggleSidebar((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClick =(id)=>{
    setShowResponse(false);
    prevMessage.map((item,index)=>{
      if(id === index){
        setInitState(true)
        setPrev(item.answer);
      }
    })  

   
  }

  useEffect(() => {
    callChatApi();
  }, [response]);

  return (
    <div className="container">
    <div className="sidebar">
      <div className="top">
        <div className="menu" onClick={() => settoggleSidebar((prev) => !prev)}>
          <MdMenu size={24} />
        </div>
        <div className="new-chat" onClick={handleInputFocus}>
          <FaPlus />
          {toggleSidebar ? <p>new chat</p> : null}
        </div>
        {toggleSidebar ? (
          <div className="recent">
            <p className="recent-title">Recent Query</p>
            <div className="mess">{/* <FaRegMessage /> */}</div>
          </div>
        ) : null}
        {toggleSidebar &&
          prevMessage.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                
                className="recent-entry"
              >
                <p>{item.question.slice(0, 18)}...</p>
              </div>
            );
          })}

        {!toggleSidebar &&
          prevMessage.map((item, index) => {
            return (
              <div
                key={index}
                // onClick={() => loadrecentPrompt(item)}
                className="recent-entry"
              >
                <p>{item.question.slice(0, 5)}...</p>
              </div>
            );
          })}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <FaRegCircleQuestion />
          {toggleSidebar ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FaHistory />
          {toggleSidebar ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <IoSettingsOutline />
          {toggleSidebar ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Sidebar;
