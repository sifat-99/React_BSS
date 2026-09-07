import logoImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header className="my-8 text-center">
      <img
        src={logoImg}
        alt="Quiz logo"
        className="w-24 h-24 object-contain inline-block"
        style={{
          filter: "drop-shadow(0_0_4px_rgba(0,0,0,0.6))",
        }}
      />
      <h1 className="font-roboto-condensed font-bold text-[2.5rem] tracking-[0.6rem] m-0 uppercase bg-gradient-to-r from-[#e781fb] from-40% to-[#8e76fa] to-60% bg-clip-text text-transparent inline-block align-middle ml-4">
        ReactQuiz
      </h1>
    </header>
  );
}
