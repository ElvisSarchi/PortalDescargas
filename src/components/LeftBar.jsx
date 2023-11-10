const LeftBar = () => {
  // Ejemplo de elementos del menú
  const menuItems = [
    { id: 1, title: "Inicio", link: "/dashboard" },
    { id: 2, title: "Perfil", link: "/perfil" },
    { id: 3, title: "Configuración", link: "/configuracion" },
    // Puedes agregar más elementos al menú
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  const { name, identification } = user;
  //imprirmir en consola la ruta actual
  console.log(window.location.pathname);
  const path = window.location.pathname;
  return (
    <div className="py-2 px-4 overflow-auto">
      <h2>Bienvenido</h2>
      <h3 className="font-bold">{name}</h3>
      <ul className="mt-5">
        {menuItems.map((item) => (
          <li className="my-3" key={item.id}>
            <a
              className={
                path === item.link
                  ? `font-bold rounded-lg bg-cyan-300 p-2`
                  : `hover:text-blue-800 hover:underline`
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
