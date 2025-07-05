export default function Button({ type = "submit", children, onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
