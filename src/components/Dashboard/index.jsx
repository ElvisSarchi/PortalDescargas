import { useEffect } from "react";
import API from "../../Hooks/API";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import Spinner from "../Spinner";
import {useStoreDocs} from "../../store/user";
export default function Dashboard() {
  const { docs: documents, setDocs: setDocuments } = useStoreDocs((state) => state);
  const [state, setState] = useStateWithMerge({
    data: documents,
    isLoading: false,
  });
  const { data, isLoading } = state;
  async function fetchData() {
    /* try {
      setState({ isLoading: true });
      const { documents } = await API.getDocuments();
      setState({ data: documents });
      setDocuments(documents);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoading: false });
    } */
  }
  console.log(documents);
  useEffect(() => {
    if (documents.length === 0) fetchData();
    const unsubscribe = useStoreDocs.subscribe(
      ({ docs }) => {
        setState({ data: docs });
      },
      (state) => state
    );
    return () => unsubscribe();
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
