"use client";

import { useEffect, useState } from "react";

const Timer = (props) => {
  let time = props.time * 60 - 1;
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  useEffect(() => {
    const setTime = setInterval(() => {
      if (time === 0) {
        clearInterval(setTime);
        props.endTime();
      }

      let hrs = Math.floor(time / 3600);
      let min = Math.floor((time % 3600) / 60);
      let sec = time % 60;

      if (hrs < 10) setHours("0" + hrs);
      else setHours(hrs.toString());

      if (min < 10) setMinutes("0" + min);
      else setMinutes(min.toString());

      if (sec < 10) setSeconds("0" + sec);
      else setSeconds(sec.toString());

      time--;
    }, 1000);

    return () => clearInterval(setTime);
  }, []);

  return (
    <div className="w-[330px] bg-white fixed top-0 right-[calc(50vw-165px)] flex justify-between py-1 px-2 border-2 drop-shadow-md">
      <span className="text-[25px] font-semibold">Pozostały czas: </span>
      <div className="text-[25px] font-bold text-black tracking-wide">
        <span className="countdown">
          <span style={{ "--value": hours }}></span>:
          <span style={{ "--value": minutes }}></span>:
          <span style={{ "--value": seconds }}></span>
        </span>
      </div>
    </div>
  );
};

export default Timer;
