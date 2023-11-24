import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import useStateWithMerge from "../Hooks/useStateWithMerge";
import LeftBar from "./LeftBar";
import SwitchTheme from "./ui/SwitchTheme";
import Logout from "./ui/logout";
import { useStoreDocuments } from "../store";
import { useStoreDocs, useStoreUser } from "../store/user";
export default function Header({ themeaux = `dark`, name = `` }) {
  const [state, setState] = useStateWithMerge({
    isOpen: false,
  });
  const { theme } = useStoreUser((state) => state);
  const { isOpen } = state;
  const toggleOpen = () => {
    setState({ isOpen: !isOpen });
  };
  async function cerrarSesion() {
    try {
      await fetch("/api/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/";
      useStoreDocs.persist.clearStorage();
    } catch (error) {
      console.log(error);
    }
  }

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
          <LeftBar name={name} />
        </div>
      </Drawer>
      <div className="gap-2 items-center flex">
        <SwitchTheme themeaux={themeaux} />
        <Logout onClick={cerrarSesion} />
      </div>
    </div>
  );
}
