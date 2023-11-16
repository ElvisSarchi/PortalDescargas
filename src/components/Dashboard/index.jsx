import { useEffect } from "react";
import API from "../../Hooks/API";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import Spinner from "../Spinner";
import { useStoreDocuments } from "../../store";
export default function Dashboard() {
  const { documents, setDocuments } = useStoreDocuments((state) => state);
  const [state, setState] = useStateWithMerge({
    data: documents,
    isLoading: false,
  });
  const { data, isLoading } = state;
  async function fetchData() {
    try {
      setState({ isLoading: true });
      const { documents } = await API.getDocuments();
      setState({ data: documents });
      setDocuments(documents);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoading: false });
    }
  }
  useEffect(() => {
    console.log(documents);
    if(documents.length > 0) return;
    fetchData();
  }, []);

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-full flex flex-1 justify-center items-center ">
          <Spinner />
        </div>
      ) : (
        <DocumentList documents={data} />
      )}
    </div>
  );
}
