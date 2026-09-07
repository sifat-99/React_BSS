import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div
      id="summary"
      className="max-w-[40rem] mx-auto my-8 p-8 bg-gradient-to-b from-[#a17eda] to-[#895fc4] text-[#191321] rounded-lg animate-slide-in-from-bottom"
      style={{
        boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.6)",
      }}
    >
      <img
        src={quizCompleteImg}
        alt="Trophy icon"
        className="block w-32 h-32 object-contain mx-auto mb-4 p-4 border-2 border-[#3a2353] rounded-full bg-[#c18cfa]"
        style={{
          filter: "drop-shadow(0_0_4px_rgba(0,0,0,0.6))",
        }}
      />
      <h2 className="font-roboto text-5xl text-center m-0 uppercase text-[#3a2353]">
        Quiz Completed!
      </h2>
      <div
        id="summary-stats"
        className="flex gap-12 w-[60%] mx-auto my-8 pb-8 border-b-2 border-[#594276]"
      >
        <p className="flex-1 flex flex-col m-0">
          <span className="font-roboto-condensed text-5xl text-[#594276] mb-2">
            {skippedAnswersShare}%
          </span>
          <span className="font-roboto-condensed uppercase text-sm text-[#30273a] -mt-3 ml-1 tracking-[0.1rem]">
            skipped
          </span>
        </p>
        <p className="flex-1 flex flex-col m-0">
          <span className="font-roboto-condensed text-5xl text-[#594276] mb-2">
            {correctAnswersShare}%
          </span>
          <span className="font-roboto-condensed uppercase text-sm text-[#30273a] -mt-3 ml-1 tracking-[0.1rem]">
            answered correctly
          </span>
        </p>
        <p className="flex-1 flex flex-col m-0">
          <span className="font-roboto-condensed text-5xl text-[#594276] mb-2">
            {wrongAnswersShare}%
          </span>
          <span className="font-roboto-condensed uppercase text-sm text-[#30273a] -mt-3 ml-1 tracking-[0.1rem]">
            answered incorrectly
          </span>
        </p>
      </div>
      <ol className="list-none my-8 mx-auto p-0 text-center">
        {userAnswers.map((answer, index) => {
          let cssClass = "my-1 font-roboto-condensed font-bold text-[#251e2f]";

          if (answer === null) {
            cssClass = "my-1 font-roboto-condensed font-normal text-[#d1baf2]";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " text-[#054e37]";
          } else {
            cssClass += " text-[#730b4b]";
          }

          return (
            <li key={index} className="my-8">
              <h3 className="font-roboto-condensed text-base mx-auto flex justify-center items-center bg-[#2c203d] text-[#d8cde8] w-8 h-8 rounded-full">
                {index + 1}
              </h3>
              <p className="my-1 text-base text-[#30273a]">
                {QUESTIONS[index].text}
              </p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
