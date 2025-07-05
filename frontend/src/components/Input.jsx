export default function Input({ label, name, register, rules = {}, type = "text" }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={type}
        {...register(name, rules)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      
    </div>
  );
}
