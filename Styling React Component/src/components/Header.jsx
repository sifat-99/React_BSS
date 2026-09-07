import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className="flex flex-col items-center mt-8 mb-8 md:mb-16">
            <img
                src={logo}
                alt="A canvas"
                className="object-contain mb-8 w-44 h-44"
            />
            <h1 className="text-xl font-semibold tracking-widest text-center uppercase md:text-4xl text-green-400 font-title">
                ReactArt
            </h1>
            <p className="text-white">A community of artists and art-lovers.</p>
        </header>
    );
}
