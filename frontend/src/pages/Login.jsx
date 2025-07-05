import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const navigate = useNavigate();
  const onSubmit = () => {
      navigate("/request-ride");
    
  };

  return (
    <div className="w-[100%] h-screen ">
      <h2 className=" text-2xl mb-0 font-semibold text-center">Login</h2>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          register={register}
          rules={{ required: "Email is required" }}
           
        />

        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          rules={{ required: "Password is required" }}
          
          />
         
        <Button>Login</Button>
         
      </form>
    </div>
  );
}
