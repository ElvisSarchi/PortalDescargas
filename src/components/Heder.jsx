export default function Header() {
  function cerrarSesion() {
    console.log("Cerrar Sesión");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <div
      className="
    flex justify-end p-5
    "
    >
      <button
        onClick={cerrarSesion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
