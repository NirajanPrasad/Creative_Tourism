import React, { useEffect, useState } from "react";
import "./PreLoader.css";
import { gsap } from "gsap";
import { Power1, Expo } from "gsap/gsap-core";

import GetRandomNum from "./GetRandomNum";

export const PreLoader = ({ setLoading }) => {
  const [countValue, setCountValue] = useState(0);

  // 0% -> 20 - 27 -> 52 - 58 -> 78 - 83 -> 100%
  const value_1 = GetRandomNum(20, 27);
  const value_2 = GetRandomNum(52, 58);
  const value_3 = GetRandomNum(78, 83);

  function updateLoading() {
    setLoading(false);
  }

  function updateCountValue(value) {
    if (value === 100) return;
    if (value === 0) {
      setCountValue(value_1);
    } else if (value < 30) {
      setCountValue(value_2);
    } else if (value < 60) {
      setCountValue(value_3);
    } else if (value < 85) {
      setCountValue(100);
    }
  }

  function countInOutAnimation(target, value) {
    const tl = gsap.timeline();
    tl.fromTo(
      target,
      {
        y: 100,
        opacity: 0,
        stagger: 0.3,
      },
      {
        y: 0,
        opacity: 1,
        stagger: { each: 0.16, from: "start" },
        duration: 0.5,
        ease: Expo.easeInOut,
      }
    ).to(target, {
      y: -150,
      delay: 1,
      duration: 0.4,
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
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: Expo.easeInOut,
        }
      );
      gsap.fromTo(
        ".preloader_svg",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: Power1.easeIn,
        }
      );
    } else if (value > 90) {
      gsap.to(".percentage", {
        x: 112,
        duration: 0.5,
        ease: Expo.easeOut,
      });
      gsap.to(".percentage", {
        y: -150,
        delay: 1.5,
        duration: 0.7,
        opacity: 0,
        onComplete: () => {
          setTimeout(updateLoading, 300);
        },
      });
      gsap.to(".preloader_svg", {
        opacity: 0,
        delay: 1.5,
        duration: 0.5,
      });
    } else if (value > 0) {
      gsap.to(".percentage", {
        x: 62,
        duration: 0.5,
        ease: Expo.easeOut,
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
      const childElement = document.querySelectorAll(".counts .number");

      countInOutAnimation(childElement, countValue);
    });
  }, [countValue]);

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
