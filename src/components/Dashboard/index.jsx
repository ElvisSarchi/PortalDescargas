import { useEffect } from "react";
import API from "../../Hooks/API";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import "../../styles/loader.css";
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
      setState({ data: documents });
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
    <div className="">
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center ">
          <div className="loader"></div>
        </div>
      ) : (
        <DocumentList documents={data} />
      )}
    </div>
  );
}
