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
  });

  const { name, isLoadingUser } = state;
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
  return (
    <>
      <Alert />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 w-full gap-4">
        <div className="flex flex-col gap-2 justify-center rounded-lg bg-sacilightCont dark:bg-saciblackCont items-center p-2">
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
      </div>
    </>
  );
}
