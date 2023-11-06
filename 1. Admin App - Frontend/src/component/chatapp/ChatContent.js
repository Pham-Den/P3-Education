import { useRef, useEffect } from "react";
import styles from "./ChatContent.module.css";
import { ApiMessage, URL_Server } from "../../utils/API";
import UserCard from "./UserCard";
import AdminCard from "./AdminCard";
import { useSelector } from "react-redux";
const ChatContent = (props) => {
  const user = useSelector((state) => state.login.user);
  const messageRef = useRef();

  function clickPress(event) {
    if (event.key == "Enter") {
      messageHandle();
    }
  }
  //xử lý gửi tin nhắn
  const messageHandle = () => {
    //1. gửi tin nhắn vào api - post lưu vào database
    //2. emit message
    //3. update vào state

    //1. gửi tin nhắn vào api - post lưu vào database
    //nếu không có tin thì không làm gì
    if (!messageRef.current.value.trim()) {
      return;
    }

    //nếu tin nhắn hợp lệ
    const messageData = {
      message: messageRef.current.value.trim(),
      roomid: props.roomid,
      isuser: false,
      sender: user && user._id ? user._id : null,
    };
    console.log(messageData);

    fetch(ApiMessage.apiPostMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));

    //2. emit vào roomchat
    props.socket.emit("message-admin", messageData);

    //3. update vào state
    props.messageData(messageData);

    //4. xoá input
    messageRef.current.value = "";
  };

  return (
    <div className={styles["container-content"]}>
      <div className={styles.content}>
        {props.content.length > 0 &&
          props.content.map((data) => {
            if (data.isuser) {
              return <UserCard>{data.message}</UserCard>;
            } else {
              return <AdminCard>{data.message}</AdminCard>;
            }
            // return ({data.isuser ? "" : ""})
          })}
      </div>
      <div className={styles["send-container"]}>
        <input onKeyDown={clickPress} ref={messageRef}></input>
        <button onClick={messageHandle}>Send</button>
      </div>
    </div>
  );
};

export default ChatContent;
