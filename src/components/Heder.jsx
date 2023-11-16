import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import useStateWithMerge from "../Hooks/useStateWithMerge";
import LeftBar from "./LeftBar";
import SwitchTheme from "./ui/SwitchTheme";
import { useEffect } from "react";
import { useStoreDocuments } from "../store";
import Logout from "./ui/logout";
export default function Header() {
  const [state, setState] = useStateWithMerge({
    isOpen: false,
  });
  const { theme } = useStoreDocuments((state) => state);
  const { isOpen } = state;
  const toggleOpen = () => {
    setState({ isOpen: !isOpen });
  };
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  useEffect(() => {
    setState({
      theme: localStorage.getItem("theme") || "light",
    });
  }, [localStorage]);

  const MenuSVG = ({ stroke = "#ffffff", size = "30px" }) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke={stroke}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  return (
    <div
      className="
    flex justify-between p-5 flex-1 w-full dark:bg-saciblackCont bg-sacilightCont dark:text-white items-center border-b dark:border-saciblack
    "
    >
      <img
        src="/SaciApp.svg"
        className="bg-white p-2 h-10 rounded-lg md:flex hidden"
      />
      <button className="flex md:hidden" onClick={toggleOpen}>
        <MenuSVG stroke={theme === "dark" ? "#ffffff" : "#000000"} />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleOpen}
        direction="left"
        width="auto"
        size={224}
        style={{
          backgroundColor: theme === "dark" ? "#242526" : "#ffffff",
        }}
      >
        <div className="flex flex-1 flex-col">
          <picture className="p-4 cursor-pointer" onClick={toggleOpen}>
            <img
              src="/SaciApp.svg"
              className="bg-white p-2 rounded-lg md:hidden flex justify-center"
            />
          </picture>
          <LeftBar />
        </div>
      </Drawer>
      <div className="gap-2 items-center flex">
        <SwitchTheme />
        <Logout onClick={cerrarSesion} />
      </div>
    </div>
  );
}
