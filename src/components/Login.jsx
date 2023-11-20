import { useState } from "react";
import Input from "./Input";
import Spinner from "./Spinner";
import API from "../Hooks/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spin from "./ui/spin";

export default function Login() {
  const [state, setState] = useState({
    identification: "",
    password: "",
    isLoading: false,
  });
  const { identification, password, isLoading } = state;
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (e) => {
    try {
      setState({ ...state, isLoading: true });
      const { token, user } = await API.login({ identification, password });
      toast.success("Bienvenido");
      window.location.href = "/dashboard";
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  return (
    <div className="max-w-[290px] mb-32">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mb-16">
        <img src="/SaciApp.svg" className="py-2 px-5 rounded-lg" />
      </div>
      <div className="relative mb-6 mt-5">
        <Input
          label="Usuario"
          placeholder="Ingrese su cedula o ruc"
          id="identification"
          name="identification"
          type="text"
          maxLength={13}
          pattern="[0-9]*"
          value={identification}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (isNaN(e.key) || e.key.trim().length === 0) {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div className="relative mb-6">
        <Input
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onLogin();
            }
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex flex-1 justify-center">
          <Spin />
        </div>
      ) : (
        <button
          id="btnlogin"
          onClick={onLogin}
          className="rounded-md py-2 px-4 bg-saciblue/90 text-white hover:bg-saciblue w-full"
        >
          Ingresar
        </button>
      )}
    </div>
  );
}
