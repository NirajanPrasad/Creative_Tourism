import React, { useEffect, useState } from "react";
import "./PreLoader.css";
import { gsap } from "gsap";
import { Power1, Power4, Expo } from "gsap/gsap-core";

import GetRandomNum from "./GetRandomNum";

export const PreLoader = ({ setLoading }) => {
  const [countValue, setCountValue] = useState(0);
  const [percentageCSS, setPercentageCSS] = useState(0);
  // 0% -> 20 - 27 -> 52 - 58 -> 78 - 83 -> 100%

  const value_1 = GetRandomNum(20, 27);
  const value_2 = GetRandomNum(52, 58);
  const value_3 = GetRandomNum(78, 83);

  function updateCountValue(value) {
    if (value === 100) return;
    if (value === 0) {
      setCountValue(value_1);
      return;
    } else if (value < 30) {
      setCountValue(value_2);
      return;
    } else if (value < 60) {
      setCountValue(value_3);
      return;
    } else if (value < 85) {
      setCountValue(100);
      return;
    }
  }

  function countInOutAnimation(target, value) {
    const tl = gsap.timeline();
    tl.fromTo(
      target,
      {
        y: 100,
        opacity: 0,
      },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: Expo.easeOut }
    ).to(target, {
      y: -150,
      delay: 1,
      duration: 0.7,
      opacity: 0,
      onComplete: () => {
        updateCountValue(value);
      },
    });

    if (value === 0) {
      gsap.fromTo(
        ".percentage",
        {
          y: 100,
          opacity: 0,
        },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: Expo.easeOut }
      );
    }

    if (value > 90) {
      gsap.to(".percentage", {
        x: 112,
        duration: 0.5,
        ease: Power1.easeInOut,
      });
    } else if (value > 0) {
      gsap.to(".percentage", {
        x: 62,
        duration: 0.5,
        ease: Power1.easeInOut,
      });
    }
  }

  useEffect(() => {
    console.log(countValue);
    const element = document.querySelector(".counts");
    const text = element.innerText.split("");

    element.innerText = "";
    text.forEach((value, index) => {
      const letter = document.createElement("span");
      letter.className = "number";

      letter.innerText = value;

      element.appendChild(letter);

      countInOutAnimation(".counts .number", countValue);
    });
  }, [countValue]);

  // useEffect(() => {
  //   console.log(document.querySelector(".counts .number"));
  //   const tl = gsap.timeline();

  //   tl.fromTo(
  //     ".counts, .percentage",
  //     {
  //       y: 100,
  //       opacity: 0,
  //       duration: 0.7,
  //     },
  //     { y: 0, opacity: 1, stagger: 0.2 }
  //   )
  //     .to(".counts", {
  //       y: -150,
  //       delay: 1,
  //       duration: 0.7,
  //       opacity: 0,
  //       onComplete: () => {
  //         setCountValue(value_1);
  //       },
  //     })
  //     .to(".percentage", {
  //       x: 62,
  //       duration: 0.3,
  //       ease: Power1.easeInOut,
  //     })
  //     .fromTo(
  //       ".counts ",
  //       {
  //         y: 100,
  //         opacity: 0,
  //         duration: 0.7,
  //       },
  //       { y: 0, opacity: 1, stagger: 0.5 }
  //     );
  //   // .to(".counts .number", {
  //   //   y: -150,
  //   //   delay: 1,
  //   //   duration: 0.7,
  //   //   opacity: 0,
  //   //   onComplete: () => {
  //   //     setCountValue(value_2);
  //   //   },
  //   // });
  //   // .fromTo(
  //   //   ".counts",
  //   //   {
  //   //     y: 100,
  //   //     opacity: 0,
  //   //     duration: 0.7,
  //   //   },
  //   //   { y: 0, opacity: 1, stagger: 0.2 }
  //   // )
  //   // .to(".counts", {
  //   //   y: -150,
  //   //   delay: 1,
  //   //   duration: 0.7,
  //   //   opacity: 0,
  //   //   onComplete: () => {
  //   //     setCountValue(value_3);
  //   //   },
  //   // })
  //   // .fromTo(
  //   //   ".counts",
  //   //   {
  //   //     y: 100,
  //   //     opacity: 0,
  //   //     duration: 0.7,
  //   //   },
  //   //   { y: 0, opacity: 1, stagger: 0.2 }
  //   // )
  //   // .to(".counts", {
  //   //   y: -150,
  //   //   delay: 1,
  //   //   duration: 0.7,
  //   //   opacity: 0,
  //   //   onComplete: () => {
  //   //     setCountValue(100);
  //   //   },
  //   // })
  //   // .to(".percentage", { x: 112, duration: 0.5, ease: Power1.easeInOut })
  //   // .fromTo(
  //   //   ".counts",
  //   //   {
  //   //     y: 100,
  //   //     opacity: 0,
  //   //     duration: 0.7,
  //   //   },
  //   //   { y: 0, opacity: 1, stagger: 0.2 }
  //   // )
  //   // .to(".percentage, .counts", {
  //   //   y: -150,
  //   //   delay: 1,
  //   //   duration: 0.7,
  //   //   opacity: 0,
  //   //   stagger: -0.2,
  //   // });
  // }, []);

  return (
    <>
      <div className={`preloader_div`}>
        <div className="preloader_svg">Middle</div>
      </div>

      <div className="preloader_counter">
        <div className="counts">{countValue}</div>
        <p className="percentage">%</p>
      </div>
    </>
  );
};
