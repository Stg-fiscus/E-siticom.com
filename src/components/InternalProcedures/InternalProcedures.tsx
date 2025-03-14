import { useClient } from "@backend/client";
import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { IPageToken } from "@types";
import { Divider } from "antd";
import { useEffect, useState } from "react";


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
    <div className="p-3">
      <p className="mb-4 text-center text-2xl font-semibold">
        Тун удахгүй....
      </p>
      <Divider />
      {token ? (
        <iframe
          src={`https://docs.google.com/gview?url=${token.image}&embedded=true`}
          className="h-[75vh] w-full"
        ></iframe>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default InternalProceduresPage; 

// https://drive.google.com/drive/folders/1JsF9NtgTg2FnPBis0_NNKqbCueklDpzc?ths=true 
