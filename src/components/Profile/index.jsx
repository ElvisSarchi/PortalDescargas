import useStateWithMerge from "../../Hooks/useStateWithMerge";
import InputReact from "../ui/InputReact";
import Spin from "../ui/spin";
import { Alert, toast } from "../ui/Alert";
import API from "../../Hooks/API";
import { useStoreDocuments } from "../../store";

export default function Profile() {
  const { user, setUser } = useStoreDocuments((state) => state);
  const [state, setState] = useStateWithMerge({
    name: user?.name || "",
    isLoadingUser: false,
    isLoadingPassword: false,
    password: ``,
    newPassword: ``,
    confirmPassword: ``,
  });

  const {
    name,
    isLoadingUser,
    isLoadingPassword,
    password,
    newPassword,
    confirmPassword,
  } = state;
  function handleInput(input) {
    //transormar a mayusculas el input
    const inputmayus = input.target.value.toUpperCase();
    setState({ name: inputmayus });
  }

  async function updateProfile() {
    try {
      setState({ isLoadingUser: true });
      await API.updateProfile({ name });
      setUser({ ...user, name });
      toast.success("Usuario actualizado");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error || "Error al actualizar el usuario"
      );
    } finally {
      setState({ isLoadingUser: false });
    }
  }
  function validatePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }
    return true;
  }
  async function updatePassword() {
    try {
      if (!validatePassword()) return;
      setState({ isLoadingPassword: true });
      await API.updatePassword({ password, newPassword, confirmPassword });
      toast.success("Contraseña actualizada");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error || "Error al actualizar la contraseña"
      );
    } finally {
      setState({ isLoadingPassword: false });
    }
  }
  return (
    <>
      <Alert />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 w-full gap-4">
        <div className="flex flex-col gap-2  rounded-lg bg-sacilightCont dark:bg-saciblackCont items-center p-2 py-4">
          <h3>Actualizar Perfil</h3>
          <InputReact label="Nombre" value={name} onChange={handleInput} />
          {isLoadingUser ? (
            <Spin />
          ) : (
            <button
              onClick={updateProfile}
              className="p-2 rounded-lg bg-saciblue dark:bg-blue-500 text-white"
            >
              Guardar
            </button>
          )}
        </div>
        <div className="p-2 bg-sacilightCont dark:bg-saciblackCont items-center rounded-lg justify-center flex flex-1 flex-col gap-2 py-4">
          <h3>Actualizar Contraseña</h3>
          <InputReact
            label="Contraseña Actual"
            type="password"
            value={password}
            onChange={(e) => setState({ password: e.target.value })}
          />
          <InputReact
            label="Contraseña Nueva"
            type="password"
            value={newPassword}
            onChange={(e) => setState({ newPassword: e.target.value })}
          />
          <InputReact
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setState({ confirmPassword: e.target.value })}
          />
          {isLoadingPassword ? (
            <Spin />
          ) : (
            <button onClick={updatePassword} className="p-2 rounded-lg bg-saciblue dark:bg-blue-500 text-white">
              Guardar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
