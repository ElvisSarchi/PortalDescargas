import { useState } from "react";
import Input from "./Input";
import Spinner from "./Spinner";
import API from "../Hooks/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  const onLogin = async (e) => {
    try {
      setState({ ...state, isLoading: true });
      const { token } = await API.login({ identification, password });
      console.log(token);
      toast.success("Bienvenido");
      window.location.href = "/dashboard";
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  return (
    <div className="rounded-xl p-5 border m-5">
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
      <div>
        <img src="/SaciApp.svg" className="bg-white py-2 px-5 rounded-lg" />
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
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"></div>

        <a href="#!">¿Olvido su contraseña?</a>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          id="btnlogin"
          onClick={onLogin}
          className="rounded-xl py-2 px-4 bg-saciblue text-white hover:bg-saciblue/80 w-full"
        >
          Ingresar
        </button>
      )}
    </div>
  );
}
