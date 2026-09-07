export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly
    ? "text-primary hover:text-primary-hover active:text-primary-hover bg-transparent border-none"
    : "bg-primary border border-primary text-text-inverse px-6 py-2 rounded-[4px] hover:bg-primary-hover hover:border-primary-hover hover:text-text-inverse active:bg-primary-hover active:border-primary-hover active:text-text-inverse";

  cssClasses += " cursor-pointer font-inherit " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
