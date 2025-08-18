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
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      ease: "expo.inOut",
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

    return () => {
      tl.kill();
    };
  }, []);

  // Main content animation + mousemove
  useEffect(() => {
    if (!showContent) return;

    const tl = gsap.timeline();

    tl.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "expo.inOut",
    })
      .to(".sky", { scale: 1.1, rotate: 0, duration: 2, delay: "-.8", ease: "expo.inOut" }, "<")
      .to(".bg", { scale: 1.1, rotate: 0, duration: 2, delay: "-.8", ease: "expo.inOut" }, "<")
      .to(
        ".character",
        { scale: .7, x: "-50%", bottom: "-60%", rotate: 0, duration: 2, delay: "-.8", ease: "expo.inOut" },
        "<"
      )
      .to(".adult", { scale: 1, rotate: 0, duration: 2, delay: "-.8", ease: "expo.inOut" }, "<")
      .to(".text", { scale: .6, rotate: 0, duration: 2, delay: "-.8", ease: "expo.inOut" }, "<");

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text .adult", { x: `${xMove * 0.4}%` });
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
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
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
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          {/* Landing Section */}
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">Rockstar</h3>
              </div>
            </div>

            {/* Hero Images */}
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="/Assets/sky.png"
                alt="sky"
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="/Assets/bg.png"
                alt="background"
              />

              <img
                src="/Assets/logo18.png"
                alt="18+ Logo"
                className="absolute adult top-1/2 left-3/5 w-20 h-20" />

              <div className="text text-white flex flex-col gap-3 absolute top-5 left-1/3 -translate-x-1/2 rotate-[-10deg]">
                <h1 className="text-[8rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[8rem] leading-none ml-10">theft</h1>
                <h1 className="text-[8rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[190%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]"
                src="/Assets/girlbg.png"
                alt="character"
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <FaAnglesDown />
                <h3 className="text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/Assets/ps5.png"
                alt="ps5"
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="limg relative w-1/2">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="/Assets/imag.png"
                  alt="preview"
                />
              </div>
              <div className="rg w-[30%]">
                <h1 className="text-5xl">Still Running,</h1>
                <h1 className="text-5xl">Not Hunting</h1>
                <p className="mt-10 text-lg font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio possimus, asperiores nam, omnis inventore nesciunt a architecto eveniet saepe, ducimus necessitatibus at voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At eius illum fugit eligendi nesciunt quia similique velit excepturi soluta tenetur illo repellat consectetur laborum eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum autem sapiente.
                </p>
                <button className="bg-yellow-500 px-5 py-5 text-black mt-10 text-2xl cursor-pointer">Download Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
