"use client";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { FaAnglesDown } from "react-icons/fa6";

const Page = () => {
  const [showContent, setShowContent] = useState(false);

  // Intro animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.easeinOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      ease: "expo.easeinOut",
      delay: -1.8,
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          setShowContent(true);
          this.kill();
        }
      },
    });

    return () => tl.kill();
  }, []);

  // Main content animation + mousemove
  useEffect(() => {
    if (!showContent) return;

    const tl = gsap.timeline();

    tl.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2.5,
      delay: "-1",
      ease: "expo.inOut",
    })
      .to(".sky", { scale: 1.1, rotate: 0, duration: 2, delay: "-.4", ease: "expo.inOut" }, "<")
      .to(".bg", { scale: 1.2, rotate: 0, duration: 2, delay: "-.4", ease: "expo.inOut" }, "<")
      .to(".character", { scale: 0.7, x: "-50%", bottom: "-65%", rotate: 0, duration: 2, delay: "-.6", ease: "expo.inOut" }, "<")
      .to(".adult", { scale: 1, rotate: 0, duration: 2, delay: "-.4", ease: "expo.inOut" }, "<")
      .to(".text", { scale: 0.6, rotate: 0, duration: 2, delay: "-.4", ease: "expo.inOut" }, "<");

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .adult", { x: `${xMove * 0.8}%`});
      gsap.to(".main .text", { x: `${xMove * 0.4}%`});
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    };

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", handleMouseMove);

    return () => {
      main?.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
    };
  }, [showContent]);

  return (
    <>
      {!showContent && (
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    fontSize="250"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="Arial Black"
                  >
                    VI
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href="/Assets/bg.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#viMask)"
            />
          </svg>
        </div>
      )}

      {showContent && (
        <div className="main w-full h-full rotate-[-10deg] scale-[1.7] relative">
          {/* Landing Section */}
          <div className="landing relative w-full h-fullHey, Cortana.  bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-5 px-5 sm:py-10 sm:px-10">
              <div className="logo flex gap-4 md:gap-6 items-center">
                <div className="lines flex flex-col gap-[3px] sm:gap-[5px]">
                  <div className="line w-7 h-1 sm:w-13 sm:h-2 bg-white"></div>
                  <div className="line w-5 h-1 sm:w-8 sm:h-2 bg-white"></div>
                  <div className="line w-3 h-1 sm:w-5 sm:h-2 bg-white"></div>
                </div>
                <h3 className="text-xl sm:text-4xl -mt-[4px] leading-none text-white">Rockstar</h3>
                <img src="/Assets/Rockstar_Games_Logo.png"
                  className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
            </div>

            {/* Hero Images */}
            <div className="imagesdiv relative w-full h-screen overflow-hidden">
              {/* Sky Image */}
              <img
                className="absolute sky top-0 left-0 w-full h-full object-cover sm:scale-[1.5] rotate-[-15deg] sm:rotate-[-20deg]"
                src="/Assets/sky.png"
                alt="sky"
              />
              {/* Buildings Image */}
              <img
                className="absolute bg top-0 left-0 w-full h-[42rem] sm:h-full object-cover rotate-[-2deg] sm:rotate-[-3deg]"
                src="/Assets/bg.png"
                alt="background"
              />
              {/* 18+ Logo Image */}
              <img
                src="/Assets/logo18.png"
                alt="18+ Logo"
                className="absolute adult top-1/2 left-2/3 w-14 h-14 sm:w-20 sm:h-20"
              />
              {/* GTA Text */}
              <div className="text text-white flex flex-col gap-2 sm:gap-3 absolute top-20 left-1/2 sm:left-1/3 -translate-x-1/2 rotate-[-5deg] sm:rotate-[-10deg]">
                <h1 className="text-6xl sm:text-[8rem] leading-none -ml-20 sm:-ml-40">grand</h1>
                <h1 className="text-6xl sm:text-[8rem] leading-none  sm:ml-10">theft</h1>
                <h1 className="text-6xl sm:text-[8rem] leading-none -ml-20 sm:-ml-40">auto VI</h1>
              </div>
              {/* Girl Image */}
              <img
                className="absolute character bottom-0 sm:-bottom-[190%] left-1/2 -translate-x-1/2 scale-[1.5] sm:scale-[3] rotate-[-15deg] sm:rotate-[-30deg]"
                src="/Assets/girlbg.png"
                alt="character"
              />

              {/* Girl Image in Mobile View */}
              <img
                className="md:hidden absolute bottom-0"
                src="/Assets/girlbg.png"
                alt="character"
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar absolute bottom-0 left-0 w-full p-5 sm:p-10 bg-gradient-to-t from-black to-transparent text-white flex flex-col sm:items-start">
              <div className="flex gap-2 sm:gap-4 items-center">
                <FaAnglesDown className="md:text-xl" />
                <h3 className="text-sm sm:text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
              </div>
              <img
                className="absolute h-10 sm:h-[55px] top-1/2 left-2/3 sm:left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/Assets/ps5.png"
                alt="ps5"
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="w-full h-auto sm:h-screen flex flex-col sm:flex-row items-center justify-center bg-black p-6 sm:p-0">
            <div className="cntnr flex flex-col sm:flex-row text-white w-full h-auto sm:h-[80%] gap-5 sm:gap-0">
              <div className="limg relative w-full sm:w-1/2 h-60 sm:h-full">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                  src="/Assets/imag.png"
                  alt="preview"
                />
              </div>
              <div className="rg w-full sm:w-[30%] text-center sm:text-start">
                <h1 className="text-3xl sm:text-4xl">Grand Theft Auto VI</h1>
                <h1 className="text-3xl sm:text-3xl">The Next Chapter in Rockstar’s Legendary Series</h1>
                <p className="mt-5 sm:mt-10 text-sm sm:text-lg font-[Helvetica_Now_Display]">
                  Grand Theft Auto VI (GTA 6) is Rockstar Games' upcoming action-adventure title, officially confirmed with a release date of May 26, 2026, for PlayStation 5 and Xbox Series X/S.
                </p>
                <p className="mt-2 text-sm sm:text-lg font-[Helvetica_Now_Display]">
                  The game returns to Vice City, Rockstar’s fictionalized version of Miami, set in the fictional U.S. state of Leonida, inspired by Florida.
                </p>
                <p className="mt-2 text-sm sm:text-lg font-[Helvetica_Now_Display]">
                  Players will control Jason and Lucia, a duo engaged in a criminal enterprise, navigating the challenges of the drug trade and law enforcement.
                </p>
                <button className="bg-yellow-500 p-2 sm:p-3 text-black mt-5 sm:mt-10 text-sm sm:text-lg rounded cursor-pointer">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
