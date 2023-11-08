import { useEffect } from "react";
import API from "./API";
export default function ValidateToken({ ispublic = false }) {
  const token = localStorage.getItem("token");
  const verificar = async () => {
    try {
      if (ispublic) {
        if (token) {
          await API.verify();
          window.location.href = "/dashboard";
        }
      }
      if (!token) throw new Error("No existe token");
      const resp = await API.verify();
      console.log(resp);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      window.location.href = "/";
    } finally {
    }
  };

  useEffect(() => {
    verificar();
  }, []);
  return <div></div>;
}
