import React, { useState, useRef } from "react";
import "./card.css";

export default function Card() {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  function handleMouseMove(event: any) {
    const card: any = cardRef.current;
    const { offsetWidth: width, offsetHeight: height }: any = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    var mult = 40;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  }
  function handleMouseEnter() {
    const img: any = imgRef.current;
    const title: any = titleRef.current;
    const sizesBox: any = sizesboxRef.current;
    const purchase: any = purchaseRef.current;
    const desc: any = descRef.current;
    title.style.transform = "translateZ(150px)";
    img.style.transform = "translateZ(20px) rotateZ(-15deg)";
    sizesBox.style.transform = "translateZ(100px)";
    purchase.style.transform = "translateZ(75px)";
    desc.style.transform = "translateZ(75px)";
  }
  function handleMouseLeave() {
    setXRotation(0);
    setYRotation(0);

    const img: any = imgRef.current;
    const title: any = titleRef.current;
    const sizesBox: any = sizesboxRef.current;
    const purchase: any = purchaseRef.current;
    title.style.transform = "translateZ(0px)";
    img.style.transform = "translateZ(0px) rotateZ(0deg)";
    sizesBox.style.transform = "translateZ(0px)";
    purchase.style.transform = "translateZ(0px)";
  }

  return (
    <div
      className="card"
      ref={cardRef}
      //   style={{
      //     transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
      //   }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr5-zQg8HVKrkCXfoyZTkCXm2BhJTGFP1jFA&usqp=CAU"
        }
        alt="Nike-Shoe"
        className="sneaaker-img"
      />
      <h1 className="title" ref={titleRef}>
        Nike Dunk High
      </h1>
      <p ref={descRef}>
        Nike Dunk High is a high-top version of the classic Nike Dunk sneaker,
        featuring a padded collar for added support and comfort.
      </p>
      <ul className="sizes-box" ref={sizesboxRef}>
        <li>38</li>
        <li>40</li>
        <li>42</li>
        <li>44</li>
      </ul>
      <div className="button-box" ref={purchaseRef}>
        <button className="purchase">Purchase</button>
      </div>
    </div>
  );
}
