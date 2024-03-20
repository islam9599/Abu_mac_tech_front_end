import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, Stack } from "@mui/material";
import { RippleBadge } from "../../MaterialTheme/styled";
import { ArrowRight, Cancel, Chat, Send } from "@mui/icons-material";
import { verifiedMemberdata } from "../../apiServices/verify";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../types/other";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import "../../../css/chatbox.css";
import { useNavigate } from "react-router-dom";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id == verifiedMemberdata?.mb_id) {
    return (
      <Box className="auth_user">
        <div>
          <p>{data.new_message.msg}</p>
        </div>
      </Box>
    );
  } else {
    return (
      <Box className="other_user">
        <img
          src={
            data?.new_message?.mb_image
              ? data?.new_message?.mb_image
              : "/auth/author_default.jpeg"
          }
          alt={data?.new_message?.mb_nick}
        />
        <div className="user_txt_wrapper">
          <p>{data.new_message.msg}</p>
        </div>
      </Box>
    );
  }
};

export function Chatbox(props: any) {
  /** Initialization */
  const [chat, setChat] = useState(true);
  const navigate = useNavigate();

  /** Handlers */
  /** Initializations */
  const textInput: any = useRef(null);
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.connect();
    console.log("Community page!!!");

    socket?.on("connect", () => {
      console.log("Client, connected");
    });

    socket.on("newMsg", (new_message: ChatMessage) => {
      console.log("Client, newMsg");

      messagesList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
    });

    socket.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("Client, greetMsg");

      messagesList.push(
        // @ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            fontFamily: "serif",
            fontWeight: "bold",
          }}
        >
          {msg.text}, dear{" "}
          {verifiedMemberdata?.mb_nick.toUpperCase() ?? "Guest"}!
        </p>
      );
      setMessagesList([...messagesList]);
    });
    socket.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("Client, infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** Handlers */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err) {
      console.log("getKeyHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberdata) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", false);
        return false;
      }
      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);
      const mb_image_url = verifiedMemberdata?.mb_image
        ? verifiedMemberdata?.mb_image
        : "/auth/default_author.jpeg";
      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberdata?.mb_id,
        mb_nick: verifiedMemberdata?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
      // Clean input
      // Send msg
    } catch (err: any) {
      console.log("onClickHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack
      justifyContent={"flex-end"}
      position={"fixed"}
      bottom={100}
      zIndex={999}
      right={20}
    >
      <Stack
        bottom={60}
        zIndex={999}
        right={10}
        position={"absolute"}
        width={"300px"}
        height={"400px"}
        sx={{
          display: chat ? "none" : "flex",
          background: "#f1f1f1",
          borderRadius: "19px",
          transition: "opacity 0.5s ease-in-out",
          opacity: chat ? 0 : 1,
          border: "1px solid #129cb8",
        }}
      >
        <Stack>
          <Stack
            maxWidth={"400px"}
            alignItems={"center"}
            flexDirection={"row"}
            justifyContent={"center"}
            sx={{ background: "#129cb8", borderRadius: "9px" }}
          >
            <h2>Live Chat</h2>
            <RippleBadge
              badgeContent={onlineUsers}
              style={{ margin: "20px" }}
            ></RippleBadge>
          </Stack>
          <Stack width={"100%"} height={"320px"} overflow={"scroll"}>
            <Stack m={2}>
              <Box className="other_user">
                <div className="user_txt_wrapper">
                  <p>Welcome live chat!</p>
                </div>
              </Box>
              {messagesList}
            </Stack>
            {/* <Stack
              width={"230px"}
              height={"auto"}
              alignItems={"flex-end"}
              justifyContent={"flex-end"}
              m={2}
            >
              <h2>
                Welcome dear,
                {verifiedMemberdata?.mb_nick
                  ? ` ${verifiedMemberdata?.mb_nick.toUpperCase()}`
                  : " Guest"}
                !
              </h2>
              
            </Stack> */}
          </Stack>
        </Stack>
        <Stack
          width={"300px"}
          height={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          mb={"10px"}
        >
          <input
            ref={textInput}
            onChange={getInputMessageHandler}
            onKeyDown={getKeyHandler}
            type="text"
            placeholder="type here"
            style={{
              borderRadius: "9px",
              border: "1px solid #f4f4f4",
              width: "70%",
              height: "30px",
              marginRight: "10px",
            }}
          />

          <Send
            onClick={onClickHandler}
            sx={{ width: "25px", height: "25px", color: "#129cb8" }}
          />
        </Stack>
      </Stack>
      <Stack mt={10} justifyContent={"flex-end"}>
        <Button>
          {chat ? (
            <Chat
              onClick={() => setChat(!chat)}
              // src="/navbar/chatbox.png"
              style={{
                width: "39px",
                height: "39px",
                background: "#f1f1f2",
                borderRadius: "9px",
              }}
            />
          ) : (
            <Cancel
              style={{
                width: "39px",
                height: "39px",
                zIndex: "9999",
                background: "#f1f1f2",
                borderRadius: "19px",
              }}
              onClick={() => setChat(!chat)}
            />
          )}
        </Button>
      </Stack>
    </Stack>
  );
}
