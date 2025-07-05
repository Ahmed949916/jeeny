export default function Input({ label, name, register, rules = {}, type = "text" }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <input
        type={type}
        {...register(name, rules)}
        className="w-full"
      />
      
    </div>
  );
}
