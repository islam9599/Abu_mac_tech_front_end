import React, { useState } from "react";

import { Button, Stack } from "@mui/material";
import { RippleBadge } from "../../MaterialTheme/styled";
import { Cancel } from "@mui/icons-material";
import { verifiedMemberdata } from "../../apiServices/verify";

export function Chatbox(props: any) {
  /** Initialization */
  const [chat, setChat] = useState(true);

  /** Handlers */

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
          background: "#129cb8",
          borderRadius: "19px",
          transition: "opacity 0.5s ease-in-out",
          opacity: chat ? 0 : 1,
        }}
      >
        <Stack>
          <Stack
            maxWidth={"400px"}
            height={"auto"}
            alignItems={"center"}
            flexDirection={"row"}
            justifyContent={"center"}
            sx={{ background: "silver", borderRadius: "9px" }}
          >
            <h2>Live Chat</h2>
            <RippleBadge
              badgeContent={1}
              style={{ margin: "20px" }}
            ></RippleBadge>
          </Stack>
          <Stack m={2}>
            <h2>
              Welcome dear
              {verifiedMemberdata?.mb_nick
                ? ` ${verifiedMemberdata?.mb_nick.toUpperCase()}`
                : " Guest"}
              !
            </h2>
          </Stack>
          <Stack
            width={"250px"}
            height={"auto"}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            m={2}
          >
            <h2>
              Welcome dear
              {verifiedMemberdata?.mb_nick
                ? ` ${verifiedMemberdata?.mb_nick.toUpperCase()}`
                : " Guest"}
              !
            </h2>
          </Stack>
        </Stack>
        <Stack m={20} justifyContent={"center"} alignItems={"center"}>
          <input
            type="text"
            placeholder="type here"
            style={{
              borderRadius: "19px",
              border: "none",
              width: "250px",
              height: "30px",
            }}
          />
        </Stack>
      </Stack>
      <Stack mt={10} justifyContent={"flex-end"}>
        <Button>
          {chat ? (
            <img
              onClick={() => setChat(!chat)}
              src="/navbar/chatbox.png"
              style={{ width: "39px", height: "39px" }}
              alt=""
            />
          ) : (
            <Cancel
              style={{ width: "39px", height: "39px" }}
              onClick={() => setChat(!chat)}
            />
          )}
        </Button>
      </Stack>
    </Stack>
  );
}
