import { useEffect } from "react";
import useStateWithMerge from "../Hooks/useStateWithMerge";

const LeftBar = ({ name=`` }) => {
  // Ejemplo de elementos del menú
  const menuItems = [
    { id: 1, title: "Mis Comprobantes", link: "/dashboard" },
    { id: 2, title: "Perfil", link: "/perfil" },
    // Puedes agregar más elementos al menú
  ];
  const [state, setState] = useStateWithMerge({
    path: ``,
  });
  const { path } = state;

  useEffect(() => {
    setState({ path: window.location.pathname });
  }, []);
  return (
    <div className="py-2 px-4 overflow-aut h-full bg-sacilightCont dark:bg-saciblackCont w-56 text-gray-900 dark:text-white">
      <h2>Bienvenido</h2>
      <h2 className="font-semibold text-lg">{name}</h2>
      <ul className="mt-5">
        {menuItems.map((item) => (
          <li className="my-5" key={item.id}>
            <a
              className={
                path === item.link
                  ? `rounded-lg dark:bg-white text-gray-900 bg-saciMenu p-2`
                  : `hover:dark:bg-white hover:text-gray-900 hover:bg-saciMenu rounded-lg p-2`
              }
              href={item.link}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
