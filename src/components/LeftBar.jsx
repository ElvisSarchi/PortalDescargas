import { APIContext } from "astro";
const LeftBar = () => {
  // Ejemplo de elementos del menú
  const menuItems = [
    { id: 1, title: "Inicio", link: "/" },
    { id: 2, title: "Perfil", link: "/perfil" },
    { id: 3, title: "Configuración", link: "/configuracion" },
    // Puedes agregar más elementos al menú
  ];


  return (
    <div className="p-2">
      <h2>Bienvenido</h2>
      <h3>{APIContext}</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
