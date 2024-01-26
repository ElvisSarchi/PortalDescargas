import { useEffect } from "react";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import Spinner from "../Spinner";
import { useStoreDocs } from "../../store/user";
export default function Dashboard() {
  const { docs: documents, setDocs: setDocuments } = useStoreDocs(
    (state) => state
  );
  const [state, setState] = useStateWithMerge({
    data: documents,
    isLoading: false,
  });

  const { data, isLoading } = state;
  async function fetchData() {
    try {
      setState({ isLoading: true });
      console.log("isLoading", isLoading);
      const { documents: docs } = await fetch("/api/documents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setDocuments(docs);
      setState({ data: docs });
    } catch (error) {
      console.log(error);
    } finally {
      setState({ isLoading: false });
    }
  }
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
