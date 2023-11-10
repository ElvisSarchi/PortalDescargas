import { useEffect } from "react";
import API from "../../Hooks/API";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";

export default function Dashboard() {
  const [state, setState] = useStateWithMerge({
    data: [],
    isLoading: false,
  });
  const { data, isLoading } = state;
  async function fetchData() {
    try {
      setState({ isLoading: true });
      const { documents } = await API.getDocuments();
      console.log(documents);
      setState({ data: documents });
      console.log(state);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoading: false });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? <p>Cargando...</p> : <DocumentList documents={data} />}
    </div>
  );
}
