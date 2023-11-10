import { useEffect } from "react";
import API from "../../Hooks/API";
import DocumentList from "./DocumentList";
import useStateWithMerge from "../../Hooks/useStateWithMerge";
import { BulletList } from 'react-content-loader'

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
    <div>
      {isLoading ? (
        <div>
          <BulletList height={300} width="100%" uniqueKey="my-random" />
        </div>
      ) : (
        <DocumentList documents={data} />
      )}
    </div>
  );
}
