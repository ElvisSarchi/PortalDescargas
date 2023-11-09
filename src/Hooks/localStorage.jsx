import { useEffect, useState } from "react";
import API from "./API";
import "../styles/spinner.css";
export default function ValidateToken({ ispublic = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const verificar = async () => {
    try {
      setIsLoading(true);
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
      if (ispublic) return;
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verificar();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center bg-saciblack items-center z-50">
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div>
      )}
    </>
  );
}
