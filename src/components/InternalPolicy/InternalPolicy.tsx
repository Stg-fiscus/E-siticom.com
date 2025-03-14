import { useClient } from "@backend/client";
import { useAppDispatch } from "@store/hooks";
import { setNavigationDashboardSubpage } from "@store/navigation/navigationSlice";
import { IPageToken } from "@types";
import { Divider } from "antd";
import { useEffect, useState } from "react";

const InternalPolicyPage = () => {
  const dispatch = useAppDispatch();
  dispatch(setNavigationDashboardSubpage("Дотоод журам"));

  const client = useClient();
  const [token, setToken] = useState<IPageToken | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Spinner харагдах төлөв

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await client.getTokens("internal_policy");

      if (res.success) {
        setToken(res.data![0]);
      }
    };
    fetchTokens();
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false); // Iframe ачаалагдсаны дараа spinner-ийг нуух
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <p className="mb-4 text-center text-2xl font-semibold">
        Компани Дотоод Журам
      </p>
      <Divider />

      
      {isLoading && (
        <div className="flex h-[75vh] w-full items-center justify-center">
          <div className="flex flex-col items-center text-xl text-gray-600">
          
            <div className="animate-bounce text-2xl">👀</div>
            <p className="animate-fade-in mt-2 text-lg font-medium">
              Түр хүлээнэ үү...  
            </p>
          </div>
        </div>
      )}

      {/* Iframe ачаалагдсан үед харагдах хэсэг */}
      {token && (
        <iframe
          src={`https://docs.google.com/gview?url=${token.image}&embedded=true`}
          className={`h-[75vh] w-full ${isLoading ? "hidden" : "block"}`} // Spinner харагдах үед iframe нуух
          onLoad={handleIframeLoad} // Ачаалалт дуусмагц spinner-ийг нуух
        ></iframe>
      )}

      {/* Token байхгүй үед алдаа харуулах */}
      {!token && !isLoading && (
        <p className="text-center text-gray-500">Алдаа гарлаа.</p>
      )}
    </div>
  );
};

export default InternalPolicyPage;
