export default function Button({ children, ...props }) {
    return (
        <button
            className="px-5 py-2 font-semibold uppercase rounded-lg text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
            {...props}
        >
            {children}
        </button>
    );
}
