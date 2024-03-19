import React from "react";

export function Advertisements() {
  return (
    <div
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginBottom: "50px",
        objectFit: "contain",
      }}
    >
      <video
        style={{
          maxWidth: "100%",
          maxHeight: "auto",
          display: "flex",
          flexDirection: "column",
          objectFit: "cover",
        }}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source
          data-src="/home/home_video.mp4"
          type="video/mp4"
          src="/home/home_video.mp4"
        />
      </video>
    </div>
  );
}
