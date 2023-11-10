export default function Header() {
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <div
      className="
    flex justify-between p-5
    "
    >
      <img src="/SaciApp.svg" className="bg-white p-2 h-10 rounded-lg" />
      <button
        onClick={cerrarSesion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
