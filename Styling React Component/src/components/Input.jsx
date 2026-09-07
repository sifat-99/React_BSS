export default function Input({ label, invalid, ...props }) {
    let labelClasses = 'block mb-2 text-xs font-semibold tracking-wide uppercase';
    let inputClasses = 'w-full px-4 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:ring-2';

    if (invalid) {
        labelClasses += ' text-rose-500';
        inputClasses += ' text-rose-500 bg-rose-50 border-rose-400 focus:ring-rose-500';
    } else {
        labelClasses += ' text-slate-300';
        inputClasses += ' text-slate-800 bg-slate-200 border-slate-300 focus:ring-cyan-500';
    }

    return (
        <p>
            <label className={labelClasses}>{label}</label>
            <input className={inputClasses} {...props} />
        </p>
    );
}
