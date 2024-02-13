import React from "react";

export function Advertisements() {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginBottom: "50px",
      }}
    >
      <video
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source
          data-src="https://www.apple.com/105/media/us/mac/family/2023/1b2bbf5c-ddc5-44a1-9dfb-7a51c49143fa/anim/welcome/xlarge_2x.mp4"
          type="video/mp4"
          src="https://www.apple.com/105/media/us/mac/family/2023/1b2bbf5c-ddc5-44a1-9dfb-7a51c49143fa/anim/welcome/xlarge_2x.mp4"
        />
      </video>
    </div>
  );
}
