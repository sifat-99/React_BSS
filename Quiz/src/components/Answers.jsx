import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul
      id="answers"
      className="list-none m-0 p-0 flex flex-col items-center gap-2"
    >
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;

        const baseClass =
          "inline-block w-full font-roboto-condensed text-[0.9rem] py-4 px-8 border-none rounded-[24px] cursor-pointer transition-all duration-200 ease-in-out";
        let cssClass = `${baseClass} bg-[#6cb7f5] hover:bg-[#9d5af5] focus:bg-[#9d5af5] hover:text-white focus:text-white`;

        if (answerState === "answered" && isSelected) {
          cssClass = `${baseClass} bg-[#f5a76c] text-[#2c203d]`;
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass =
            answerState === "correct"
              ? `${baseClass} bg-[#5af59d] text-[#2c203d]`
              : `${baseClass} bg-[#f55a98] text-[#2c203d]`;
        }

        return (
          <li key={answer} className="w-[90%] mx-auto">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
