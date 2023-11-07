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
      const resp = await API.login({ identification, password });
      console.log(resp);
      if (resp.status === 200) {
        toast.success("Bienvenido");
        localStorage.setItem("token", `dasdsad`);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  return (
    <div class="rounded-xl p-5 border m-5">
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
        <img src="/SaciApp.svg" class="bg-white py-2 px-5 rounded-lg" />
      </div>
      <div class="relative mb-6 mt-5">
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

      <div class="relative mb-6">
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

      <div class="mb-6 flex items-center justify-between">
        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"></div>

        <a href="#!">¿Olvido su contraseña?</a>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          id="btnlogin"
          onClick={onLogin}
          class="rounded-xl py-2 px-4 bg-saciblue text-white hover:bg-saciblue/80 w-full"
        >
          Ingresar
        </button>
      )}
    </div>
  );
}
