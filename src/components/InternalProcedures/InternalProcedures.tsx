import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { useClient } from "@backend/client";
import { useEffect, useState } from "react";
import { IPageToken } from "@types";

const InternalProceduresPage = () => {
  const dispatch = useAppDispatch();
  dispatch(setNavigationDashboardSubpage("Дотоод сургалт"));

  const client = useClient();
  const [token, setToken] = useState<IPageToken | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await client.getTokens("internal_training");

      if (res.success) {
        setToken(res.data![0]);
      }
    };
    fetchTokens();
  }, []);

  return (
    <div className="p-7">
      {token ? (
        <iframe src={`https://docs.google.com/gview?url=${token.image}&embedded=true`} className="w-full h-[75vh]"></iframe>
      ) : <p>Loading...</p>}
    </div> 
  );
};

export default InternalProceduresPage;

