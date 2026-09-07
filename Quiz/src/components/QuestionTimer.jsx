import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const baseClass =
    "w-1/2 h-2 rounded-[24px] bg-[#9e5ef8] m-0 [&::-webkit-progress-bar]:bg-[#6a558a] [&::-webkit-progress-bar]:rounded-[24px] [&::-webkit-progress-value]:bg-[#9e5ef8] [&::-webkit-progress-value]:rounded-[24px]";
  const answeredClass = "bg-[#f8e59c] [&::-webkit-progress-value]:bg-[#f8e59c]";
  const cssClass =
    mode === "answered" ? `${baseClass} ${answeredClass}` : baseClass;

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={cssClass}
    />
  );
}
