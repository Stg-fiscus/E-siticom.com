import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import { Button } from "antd";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-screen items-center justify-center text-6xl text-slate-700">
      <div>
        <div className="absolute inset-4 w-10">
          {/* <div className="h-[40] w-[40px] cursor-pointer rounded-full 3xl:h-[50px] 3xl:w-[50px]">
            <Logo />
          </div>
           */}
        </div>
        <div>
          <p className="text-sm">404 | Таны хайсан хаяг байхгүй байна.</p>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="h-10 text-base" onClick={() => navigate("/")}>
            <Button name={"Нүүр хуудас руу буцах"}> 
              Нүүр хуудас руу буцах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
